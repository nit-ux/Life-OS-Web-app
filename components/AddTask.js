import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function AddTask({ user, onNewTask }) {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      alert('Please enter a task title.');
      return;
    }

    setLoading(true);
    const { error } = await supabase
      .from('tasks')
      .insert([
        {
          title,
          user_id: user.id,
          is_completed: false,
        },
      ]);

    if (error) {
      alert(error.message);
    } else {
      setTitle('');
      alert('Task added!');
      onNewTask(); // This will refresh the task list
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Task Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="e.g., Finish the report"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400"
      >
        {loading ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
}
