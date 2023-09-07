import axios from 'axios';
import { useEffect } from 'react';
import authConfig from '../configs/auth';
import { useSettings } from '../hooks/useSettings';

const baseURL = '/api/method';

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
      if (token?.[authConfig.storAccessTokenKey]) {
        config.headers.Authorization = `Bearer ${token[authConfig.storAccessTokenKey]}`;
      }

      return config;
    });

    return () => instance.interceptors.request.eject(interceptor);
  }, []);

  return children;
}

export default instance;
export { AxiosInterceptor };

