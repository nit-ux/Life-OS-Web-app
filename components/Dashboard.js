import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import AddTransaction from './AddTransaction';
import AddTask from './AddTask';
import Link from 'next/link';

// Helper function to format seconds into HH:MM:SS
const formatTime = (seconds) => {
  if (isNaN(seconds) || seconds < 0) return '00:00:00';
  const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
};

export default function Dashboard({ user, onSignOut }) {
  const [transactions, setTransactions] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [timeLogs, setTimeLogs] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTimer, setActiveTimer] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    // Fetch all three data types in parallel
    const [transactionsRes, tasksRes, logsRes] = await Promise.all([
      supabase.from('transactions').select('*').order('created_at', { ascending: false }),
      supabase.from('tasks').select('*').order('created_at', { ascending: false }),
      supabase.from('time_logs').select('task_id, start_time, end_time')
    ]);
    
    setTransactions(transactionsRes.data || []);
    setTasks(tasksRes.data || []);

    const totals = {};
    if (logsRes.data) {
      logsRes.data.forEach(log => {
        if(log.end_time) {
          const duration = (new Date(log.end_time) - new Date(log.start_time)) / 1000;
          totals[log.task_id] = (totals[log.task_id] || 0) + duration;
        }
      });
    }
    setTimeLogs(totals);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- FIXED TASK TOGGLE FUNCTION ---
  const toggleTaskStatus = async (task) => {
    const { error } = await supabase
      .from('tasks')
      .update({ is_completed: !task.is_completed })
      .match({ id: task.id });

    if (error) {
      alert('Error updating task: ' + error.message);
    } else {
      setTasks(
        tasks.map((t) => (t.id === task.id ? { ...t, is_completed: !t.is_completed } : t))
      );
    }
  };

  // --- TIME TRACKING FUNCTIONS ---
  const handleStartTimer = (taskId) => {
    if (activeTimer) {
      alert("Another timer is already running. Please stop it first.");
      return;
    }
    setActiveTimer({ taskId: taskId, startTime: new Date().toISOString() });
  };

  const handleStopTimer = async () => {
    if (!activeTimer) return;
    
    const endTime = new Date().toISOString();
    const { error } = await supabase.from('time_logs').insert([{
        task_id: activeTimer.taskId,
        user_id: user.id,
        start_time: activeTimer.startTime,
        end_time: endTime,
    }]);

    if (error) {
      alert("Error saving time log: " + error.message);
    } else {
      fetchData(); 
    }
    setActiveTimer(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
<header className="bg-white shadow">
  <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
    <h1 className="text-2xl font-bold text-gray-900">
      Life-OS Dashboard
    </h1>
    <div className="flex items-center space-x-4">
      <Link href="/analytics" legacyBehavior>
        <a className="px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 hidden sm:block">
          View Analytics
        </a>
      </Link>
      <button onClick={onSignOut} className="px-4 py-2 font-bold text-white bg-red-600 rounded-md hover:bg-red-700">
        Sign Out
      </button>
    </div>
  </div>
</header>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-6 rounded-lg shadow"><h2 className="text-xl font-semibold mb-4">Add New Transaction</h2><AddTransaction user={user} onNewTransaction={fetchData} /></div>
              <div className="bg-white p-6 rounded-lg shadow"><h2 className="text-xl font-semibold mb-4">Add New Task</h2><AddTask user={user} onNewTask={fetchData} /></div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              {/* --- FIXED: TRANSACTION LIST IS BACK --- */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
                {loading ? <p>Loading...</p> : transactions.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {transactions.map((tx) => (
                      <li key={tx.id} className="py-3 flex justify-between items-center">
                        <div><p className="font-semibold">{tx.category}</p><p className="text-sm text-gray-500">{tx.notes || new Date(tx.transaction_date).toLocaleDateString()}</p></div>
                        <p className={`font-bold ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>{tx.type === 'income' ? '+' : '-'} ₹{tx.amount}</p>
                      </li>
                    ))}
                  </ul>
                ) : <p>No transactions yet.</p>}
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
                {loading ? <p>Loading...</p> : tasks.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {tasks.map((task) => (
                      <li key={task.id} className="py-3 flex justify-between items-center">
                        <div className="flex items-center">
                          {/* --- FIXED: CHECKBOX ONCHANGE IS BACK --- */}
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600" checked={task.is_completed} onChange={() => toggleTaskStatus(task)} />
                          <div className="ml-3">
                            <p className={`font-medium ${task.is_completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>{task.title}</p>
                            <p className="text-xs text-gray-500">Total time: {formatTime(timeLogs[task.id] || 0)}</p>
                          </div>
                        </div>
                        <div>
                          {activeTimer && activeTimer.taskId === task.id ? (
                            <button onClick={handleStopTimer} className="px-3 py-1 text-sm font-bold text-white bg-red-600 rounded-md">Stop</button>
                          ) : (
                            // --- FIXED: 'disabled' logic is correct now ---
                            <button onClick={() => handleStartTimer(task.id)} className="px-3 py-1 text-sm font-bold text-white bg-green-600 rounded-md disabled:bg-gray-400" disabled={activeTimer !== null}>Start</button>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : <p>No tasks yet. Add one!</p>}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
