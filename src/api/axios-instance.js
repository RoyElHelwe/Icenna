import axios from 'axios';
import { useEffect } from 'react';
import authConfig from '../configs/auth';
import { useSettings } from '../hooks/useSettings';

export const baseURL = '/api/method';

const instance = axios.create({
  baseURL,
});

const AxiosInterceptor = ({ children }) => {
  const { settings: { language } } = useSettings();

  useEffect(() => {
    const interceptor = instance.interceptors.request.use((config) => {
      config.headers['x-api-key'] = process.env.NEXT_PUBLIC_API_KEY;
      config.headers['Language'] = language ?? 'en';

      const token = JSON.parse(window.localStorage.getItem(authConfig.storTokenKey));
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });

    return () => instance.interceptors.request.eject(interceptor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
}

export default instance;
export { AxiosInterceptor };

