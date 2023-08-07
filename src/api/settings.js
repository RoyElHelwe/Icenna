import axios from './axios-instance';

export const getGeneralSettings = (Language) => {
  return axios.get('/icenna.user_api.settings.general_settings', { Language });
};
