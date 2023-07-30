import axios from './axios-instance';

export const addChiefComplaint = ({ id, text }) => {
  return axios.post('/icenna.user_api.practitioner.chief_complaint', { id, text });
};

export const getPatients = ({ queryKey }) => {
  const [_, ] = queryKey;

  return axios.get('/icenna.user_api.practitioner.get_patients');
};

export const getEncounterInfo = ({ queryKey }) => {
  const [_, id] = queryKey;

  return axios.get('/icenna.user_api.practitioner.get_patient_encounter', {
    params: {
      id,
    }
  });
};
