import 'styles/globals.css';
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react';
import AppLayout from "components/AppLayout";
import { Provider } from 'react-redux';
import Snack from 'components/common/Snack';

import store from 'store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>

        <Snack />
      </Provider>
    </SessionProvider>
  )
}
export default MyApp
