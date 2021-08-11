import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../lib/theme";
import { useStore } from "../store";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const { lang } = useStore()
  useEffect(() => {
    lang.init()
  }, [])
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default MyApp;
