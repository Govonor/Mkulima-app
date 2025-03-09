import Layout from '../components/Layout';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';

// Define a type for your custom page props if needed
interface PageProps {
  // Add any custom props here
  // exampleProp?: string;
}

// Define a type for your custom AppProps if needed
interface MyAppProps extends AppProps<PageProps> {
  Component: {
    getLayout?: (page: ReactElement) => ReactNode;
  };
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return <Layout>{getLayout(<Component {...pageProps} />)}</Layout>;
}

export default MyApp;