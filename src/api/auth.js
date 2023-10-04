import axios from './axios-instance';

export const login = (body) => {
  return axios.post('/icenna.user_api.auth.new_login', body);
};

export const verify_otp = (body) => {
  return axios.post('/icenna.user_api.auth.verify_otp', body);
};

export const addMobile = (body) => {
  return axios.post('/icenna.user_api.auth.add_mobile', body);
};
