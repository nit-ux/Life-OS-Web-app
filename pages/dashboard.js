import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabaseClient'
import Dashboard from '../components/Dashboard'

export default function DashboardPage() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace('/') // Redirect to login if not logged in
      } else {
        setSession(session)
        setLoading(false)
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          router.replace('/')
        }
      }
    )
    
    return () => subscription.unsubscribe()
  }, [router])
  
  if (loading) {
    return <div className="flex justify-center items-center h-screen"><p>Loading Dashboard...</p></div>
  }

  if (session) {
    return <Dashboard user={session.user} onSignOut={() => {
      supabase.auth.signOut();
      router.push('/');
    }} />
  }

  return null;
}
