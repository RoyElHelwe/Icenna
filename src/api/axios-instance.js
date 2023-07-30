import axios from 'axios';
import authConfig from '../configs/auth';

const baseURL = '/api/method';

const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use((config) => {
  config.headers['x-api-key'] = process.env.NEXT_PUBLIC_API_KEY;

  const token = JSON.parse(window.localStorage.getItem(authConfig.storTokenKey));
  if (token?.[authConfig.storAccessTokenKey]) {
    config.headers.Authorization = `Bearer ${token[authConfig.storAccessTokenKey]}`;
  }
  return config;
});

export default instance;