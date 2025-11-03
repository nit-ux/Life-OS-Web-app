import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import Auth from '../components/Auth'
import Dashboard from '../components/Dashboard' // Import the new Dashboard component

export default function Home() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
      }
    )
    
    return () => subscription.unsubscribe()
  }, [])
  
  // We show a loading message while we check for a session
  if (loading) {
    return <div className="flex justify-center items-center h-screen"><p>Loading...</p></div>
  }

  if (!session) {
    return <Auth />
  } else {
    // Pass user info and the signOut function to the Dashboard
    return <Dashboard user={session.user} onSignOut={() => supabase.auth.signOut()} />
  }
}
