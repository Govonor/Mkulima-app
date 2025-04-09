import { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { NextComponentType, NextPageContext } from 'next'; // Add this import

interface MyAppProps extends AppProps {
  Component: NextComponentType<NextPageContext, any, any> & {
    getLayout?: (page: ReactElement) => ReactNode;
  };
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return <>{getLayout(<Component {...pageProps} />)}</>;
}

export default MyApp;
