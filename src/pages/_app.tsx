import Head from "next/head";
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react';
import AppLayout from "components/AppLayout";
import { Provider } from 'react-redux';
import Snack from 'components/common/Snack';
import { GlobalStyle } from 'styles/globalStyles';
import CustomThemeProvider from "styles/Providers/CustomThemeProvider/CustomThemeProvider";
import store from 'store';
import "styles/fonts.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CustomThemeProvider>
      <SessionProvider session={pageProps.session}>
        <Provider store={store}>
          <Head>
            <title>Bookground</title>
            <meta charSet="UTF-8" />
          </Head>

          <GlobalStyle />

          <main >
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>

            <Snack />
          </main>
        </Provider>
      </SessionProvider>
    </CustomThemeProvider>
  )
}
export default MyApp
