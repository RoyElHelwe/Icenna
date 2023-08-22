import { CacheProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import 'simplebar-react/dist/simplebar.min.css';
import Spinner from '../components/spinner';
import '../configs/i18n';
import { AuthProvider } from '../context/auth-context';
import { SettingsConsumer, SettingsProvider } from '../context/settings-context';
import AclGuard from '../guards/AcGuard';
import AuthGuard from '../guards/auth-guard';
import GuestGuard from '../guards/guest-guard';
import ReactHotToast from '../styles/ReactHotToast';
import ThemeComponent from '../theme/ThemeComponent';
import { createEmotionCache } from '../utils/create-emotion-cache';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchInterval: false,
      refetchIntervalInBackground: false,
    }
  }
});

const clientSideEmotionCache = createEmotionCache();

const Guard = ({ children, authGuard, guestGuard }) => {
  if (guestGuard) {
    return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>
  } else {
    return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>;
  }
};

const App = (props) => {
  const { i18n } = useTranslation();
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const setConfig = Component.setConfig ?? undefined;
  const getLayout = Component.getLayout ?? ((page) => page);
  const authGuard = Component.authGuard ?? true;
  const guestGuard = Component.guestGuard ?? false;
  const access = Component.access ?? '';

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>
          iCenna
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <ReactHotToast>
        <Toaster position='top-right' toastOptions={{ className: 'react-hot-toast' }} />
      </ReactHotToast>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
          <AuthProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <CssBaseline />
              <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
                <SettingsConsumer>
                  {({ settings }) => {
                    if (settings.language !== i18n.language) {
                      i18n.changeLanguage(settings.language);
                    }

                    return (
                      <ThemeComponent settings={settings}>
                        <Guard authGuard={authGuard} guestGuard={guestGuard}>
                          <AclGuard access={access} guestGuard={guestGuard}>
                            {getLayout(<Component {...pageProps} />)}
                          </AclGuard>
                        </Guard>
                      </ThemeComponent>
                    )
                  }}
                </SettingsConsumer>
              </SettingsProvider>
            </LocalizationProvider>
          </AuthProvider>
        </GoogleOAuthProvider>
      </QueryClientProvider>

    </CacheProvider>
  );
};

export default App;
