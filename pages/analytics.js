import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';

export default function AnalyticsPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/'); // Agar login nahi hai, toh wapas home page par bhej do
      } else {
        setUser(session.user);
        setLoading(false);
      }
    };
    checkUser();
  }, [router]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><p>Loading Analytics...</p></div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Analytics Dashboard
          </h1>
          <Link href="/" legacyBehavior>
            <a className="px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
              &larr; Back to Dashboard
            </a>
          </Link>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Financial Analytics</h2>
              <p className="text-gray-500">Charts for your finances will appear here soon...</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Time Analytics</h2>
              <p className="text-gray-500">Charts for your time tracking will appear here soon...</p>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
