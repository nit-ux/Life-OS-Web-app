import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import AddTransaction from './AddTransaction'; // Import the new component

export default function Dashboard({ user, onSignOut }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch transactions from Supabase
  const fetchTransactions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .order('transaction_date', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching transactions:', error);
    } else {
      setTransactions(data);
    }
    setLoading(false);
  };

  // Fetch transactions when the component loads
  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Life-OS Dashboard</h1>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-4 hidden sm:block">{user.email}</span>
            <button
              onClick={onSignOut}
              className="px-4 py-2 font-bold text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Column 1: Forms */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Add New Transaction</h2>
                <AddTransaction user={user} onNewTransaction={fetchTransactions} />
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
                <p className="text-gray-500">Feature coming soon...</p>
              </div>
            </div>

            {/* Column 2: Data Display */}
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
              {loading ? (
                <p>Loading transactions...</p>
              ) : transactions.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {transactions.map((tx) => (
                    <li key={tx.id} className="py-3 flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{tx.category}</p>
                        <p className="text-sm text-gray-500">{tx.notes || new Date(tx.transaction_date).toLocaleDateString()}</p>
                      </div>
                      <p className={`font-bold ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                        {tx.type === 'income' ? '+' : '-'} ₹{tx.amount}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No transactions yet. Add one to get started!</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
