import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import Auth from '../components/Auth'

export default function Home() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
      }
    )
    
    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return <Auth />
  } else {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Welcome to Life-OS!</h1>
        <p>You are logged in!</p>
        <p>Email: {session.user.email}</p>
        <button
          className="mt-4 px-4 py-2 font-bold text-white bg-red-600 rounded-md hover:bg-red-700"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </div>
    )
  }
}
