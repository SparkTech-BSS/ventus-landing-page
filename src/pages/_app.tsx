import "../styles/globals.scss";
import { useState } from "react";
import Script from "next/script";
import type { NextPageContext } from "next";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "styles/theme";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { config } from "lib/react-query-config";
import Devtools from "components/Devtools";
import { AuthProvider } from "../contexts/AuthContext";
import { AppProvider } from "../contexts/AppContext";
import { ToastProvider } from "react-toast-notifications";
import type { AppProps } from "next/app";
import type { DehydratedState } from "@tanstack/react-query";
import "react-quill/dist/quill.snow.css";

interface PageProps {
  dehydratedState?: DehydratedState;
}

type ExtendedAppProps<P = {}> = {
  err?: NextPageContext["err"];
} & AppProps<P>;

function MyApp({ Component, pageProps, err }: ExtendedAppProps<PageProps>) {
  const [queryClient] = useState(() => new QueryClient(config));

  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=AW-881543199"
      />

      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || []; 
          function gtag(){
          dataLayer.push(arguments);
        } 
        gtag('js', new Date()); gtag('config', 'AW-881543199', {
          page_path: window.location.pathname,
        });
      `,
        }}
      />

      <Script
        id="event-snippet"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          gtag('event', 'conversion', {
            'send_to': 'AW-881543199/4bM1CI6brIAYEJ-QraQD',
            'transaction_id': ''
        });
          `,
        }}
      ></Script>

      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ChakraProvider theme={theme}>
            <AuthProvider>
              <AppProvider>
                <ToastProvider>
                  <Component {...pageProps} />
                </ToastProvider>
              </AppProvider>
            </AuthProvider>
          </ChakraProvider>
          <Devtools />
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
