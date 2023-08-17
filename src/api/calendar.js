import axios from './axios-instance';

export const getAppointments = ({ queryKey }, date, practitioner) => {
  return axios.get('/icenna.user_api.receptionist.get_appointments', {
    params: {
      date,
      practitioner,
    },
  });
};

export const updateStatus = (body) => {
  return axios.post('/icenna.user_api.receptionist.update_status', body);
};
