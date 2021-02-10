import { AuthProvider } from "../lib/auth";
import { ThemeProvider, CSSReset } from "@chakra-ui/react";
import { css, Global } from "@emotion/react";

import customTheme from "@/styles/theme";

function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={customTheme}>
      <AuthProvider>
        <CSSReset />
        <CSSReset />
        <Global
          styles={css`
            html {
              scroll-behavior: smooth;
            }

            #__next {
              display: flex;
              flex-direction: column;
              min-height: 100vh;
            }
          `}
        />
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
