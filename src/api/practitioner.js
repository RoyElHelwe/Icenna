import axios from './axios-instance';

export const addChiefComplaint = ({ id, text }) => {
  return axios.post('/icenna.user_api.practitioner.chief_complaint', { id, text });
};

export const getPatients = ({ queryKey }) => {
  const [_,] = queryKey;

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

export const search = ({ queryKey }) => {
  const [_, id, text, type] = queryKey;

  return axios.get('/icenna.user_api.practitioner.search', {
    params: {
      id,
      text,
      type,
    }
  });
};

export const encounterItem = ({ id, code, t_type, i_type, status, dosage, period, dose, body_site, }) => {
  return axios.post('/icenna.user_api.practitioner.encounter_info_item', {
    id, code, t_type, i_type, status, dosage, period, dose, body_site,
  });
};

export const addDiagnosisDescription = ({ id, text }) => {
  return axios.post('/icenna.user_api.practitioner.diagnosis_description', { id, text });
};

export const getDentalCharting = () => {
  return axios.get('/icenna.user_api.practitioner.get_dental_charting');
};
