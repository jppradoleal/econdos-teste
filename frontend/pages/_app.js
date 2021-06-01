import { ChakraProvider, extendTheme } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  const theme = extendTheme({
    colors: {
      primary: {
        700: "#d1cdcd",
        500: "#d1cdcd"
      }
    }
  });
  
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp
