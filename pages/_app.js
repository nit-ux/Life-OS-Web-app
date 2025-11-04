import '../styles/globals.css';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Don't show layout on the login page
  if (router.pathname === '/') {
    // We will need to move the dashboard to a new route like /dashboard
    // For now, let's assume we will separate login page later
  }

  // Check if the current page is the login/auth page
  // In our current setup, the index page handles both auth and dashboard
  // Let's wrap Component in Layout conditionally based on pageProps
  const isAuthPage = !pageProps.user; // A simple way to check if it's the auth page

  if (isAuthPage) {
    return <Component {...pageProps} />; // Render component without layout
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
