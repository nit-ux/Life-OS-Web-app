import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import AddTransaction from './AddTransaction';
import AddTask from './AddTask';

export default function Dashboard({ user, onSignOut }) {
  const [transactions, setTransactions] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const { data: transactionsData, error: transactionsError } = await supabase.from('transactions').select('*').order('created_at', { ascending: false });
    const { data: tasksData, error: tasksError } = await supabase.from('tasks').select('*').order('created_at', { ascending: false });

    if (transactionsError) console.error('Error fetching transactions:', transactionsError);
    else setTransactions(transactionsData || []);

    if (tasksError) console.error('Error fetching tasks:', tasksError);
    else setTasks(tasksData || []);
    
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // NEW FUNCTION: To update the task status
  const toggleTaskStatus = async (task) => {
    const { data, error } = await supabase
      .from('tasks')
      .update({ is_completed: !task.is_completed })
      .match({ id: task.id });

    if (error) {
      alert('Error updating task: ' + error.message);
    } else {
      // Update the tasks list in the UI instantly
      setTasks(
        tasks.map((t) => (t.id === task.id ? { ...t, is_completed: !t.is_completed } : t))
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Life-OS Dashboard</h1>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-4 hidden sm:block">{user.email}</span>
            <button onClick={onSignOut} className="px-4 py-2 font-bold text-white bg-red-600 rounded-md hover:bg-red-700">Sign Out</button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Column 1: Forms */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-6 rounded-lg shadow"><h2 className="text-xl font-semibold mb-4">Add New Transaction</h2><AddTransaction user={user} onNewTransaction={fetchData} /></div>
              <div className="bg-white p-6 rounded-lg shadow"><h2 className="text-xl font-semibold mb-4">Add New Task</h2><AddTask user={user} onNewTask={fetchData} /></div>
            </div>

            {/* Column 2: Data Display */}
            <div className="lg:col-span-2 space-y-6">
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
                      <li key={task.id} className="py-3 flex items-center cursor-pointer group" onClick={() => toggleTaskStatus(task)}>
                        <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 pointer-events-none" checked={task.is_completed} readOnly />
                        <p className={`ml-3 font-medium ${task.is_completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>{task.title}</p>
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
