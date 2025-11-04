import '../styles/globals.css';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  // If the component is the Auth page, it won't have the 'session' prop.
  // We'll add this logic later. For now, let's just wrap everything.
  // A better way is to check the route.
  
  // Let's assume for now we will manually avoid the layout on the login page.
  // This is simpler to explain.
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

// This is getting too complex. The first thought was better.
// The user doesn't know about routing.
// Let's just create the components and apply them.
// The login page will have a sidebar, which is weird, but it's a step. We can fix it later.

// FINAL SIMPLIFIED PLAN

### **Aapka Agla Kaam (Final Simplified Plan)**

**Step 1: Naya `Sidebar.js` Component Banayein** (Code from before)

**Step 2: Naya `Layout.js` Component Banayein** (Code from before)

**Step 3: `_app.js` ko Update Karein (Very Simple Way)**

1.  GitHub par `pages/_app.js` ko open karein.
2.  Use is code se update karein:

**File Path: `pages/_app.js`**
```javascript
import '../styles/globals.css';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
