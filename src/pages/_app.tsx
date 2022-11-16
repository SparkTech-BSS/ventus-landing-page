import "../styles/globals.scss";
import { useState } from "react";
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
