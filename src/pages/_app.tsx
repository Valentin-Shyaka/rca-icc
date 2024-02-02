import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { createTheme, MantineProvider } from '@mantine/core';
import NextNProgress from 'nextjs-progressbar';
import { useState, useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '@mantine/core/styles.css';
import dynamic from 'next/dynamic';
import UserProvider from '@/contexts/UserProvider';
// import AppProvider from "../contexts/AppProvider";
// import SanityProvider from "@/contexts/SanityProvider";
const AppProvider = dynamic(() => import('@/contexts/AppProvider'));
const SanityProvider = dynamic(() => import('@/contexts/SanityProvider'));

const theme = createTheme({
  /** Put your mantine theme override here */
});

function MyApp({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  return (
    <MantineProvider theme={theme}>
      <NextNProgress color="#ff7b35" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />
      <SanityProvider>
        <UserProvider>
          <AppProvider>
            <Component {...pageProps} />
          </AppProvider>
        </UserProvider>
      </SanityProvider>
    </MantineProvider>
  );
}

export default MyApp;
