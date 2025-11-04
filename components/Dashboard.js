export default function Dashboard({ user, onSignOut }) {
  // We will add logic back later. For now, just focus on the UI.
  
  // Extracting the name from the email for a personal touch
  const userName = user.email.split('@')[0];

  return (
    <div className="w-full">
      {/* Top Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-gray-500">How are you</p>
          <h2 className="text-3xl font-bold text-gray-800 capitalize">
            {userName}
          </h2>
        </div>
        <button
          onClick={onSignOut}
          className="px-4 py-2 font-bold text-white bg-red-600 rounded-md hover:bg-red-700"
        >
          Sign Out
        </button>
      </div>

      {/* Main Grid for Widgets/Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Placeholder for Account Cards */}
        <div className="bg-white p-4 rounded-lg shadow-md h-32 flex items-center justify-center">
          <p className="text-gray-400">Account Cards will go here</p>
        </div>

        {/* Placeholder for Budget Cards */}
        <div className="bg-white p-4 rounded-lg shadow-md h-32 flex items-center justify-center lg:col-span-2">
          <p className="text-gray-400">Budget Cards will go here</p>
        </div>

        {/* Placeholder for Goals/Milestones */}
        <div className="bg-white p-4 rounded-lg shadow-md h-32 flex items-center justify-center">
          <p className="text-gray-400">Goals/Milestones will go here</p>
        </div>
        
        {/* Placeholder for Transaction List */}
        <div className="bg-white p-4 rounded-lg shadow-md h-64 flex items-center justify-center lg:col-span-2">
          <p className="text-gray-400">Transaction List will go here</p>
        </div>
        
      </div>
    </div>
  );
}
