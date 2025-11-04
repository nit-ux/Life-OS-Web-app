import '../styles/globals.css';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // If it's the login page (index), don't use the layout.
  if (router.pathname === '/') {
    return <Component {...pageProps} />;
  }

  // For all other pages, use the layout.
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
