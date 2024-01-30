import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, MantineProvider } from "@mantine/core";
import NextNProgress from "nextjs-progressbar";
import AppProvider from "../contexts/AppProvider";
import { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "@mantine/core/styles.css";
import SanityProvider from "@/contexts/SanityProvider";

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
      <NextNProgress
        color="#ff7b35"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      <SanityProvider>
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </SanityProvider>
    </MantineProvider>
  );
}

export default MyApp;
