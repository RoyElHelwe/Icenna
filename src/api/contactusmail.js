import axios from './axios-instance';

// in params we have to pass the data that we want to send to the backend
export const sendEmail = (params) => {
    return axios.post('/icenna.utils.utils.contact_us_mail', params);
};