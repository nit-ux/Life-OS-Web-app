export default function Dashboard({ user, onSignOut }) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Life-OS Dashboard
          </h1>
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
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Column 1: Add Transaction */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Add New Transaction</h2>
                {/* Transaction form will go here */}
                <p className="text-gray-500">Feature coming soon...</p>
              </div>

              {/* Column 2: Add Task */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
                {/* Task form will go here */}
                <p className="text-gray-500">Feature coming soon...</p>
              </div>

              {/* Area for displaying data */}
              <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Your Data</h2>
                 {/* Data tables will go here */}
                <p className="text-gray-500">Your tasks and transactions will appear here...</p>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
