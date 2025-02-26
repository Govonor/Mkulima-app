import Layout from '../components/Layout';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) { // Corrected component definition
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp; // Corrected default export