import "../styles/globals.scss";
import { AuthProvider } from "../contexts/AuthContext";
import { ToastProvider } from "react-toast-notifications";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <ToastProvider>
          <Component {...pageProps} />
        </ToastProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
