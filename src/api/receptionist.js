import axios from './axios-instance';

export const getAppointments = ({ queryKey }) => {
  const [_, date, practitioner] = queryKey;

  return axios.get('/icenna.user_api.receptionist.get_appointments', {
    params: {
      date,
      practitioner,
    },
  });
};
