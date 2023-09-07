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

export const encounterItem = (body) => {
  return axios.post('/icenna.user_api.practitioner.encounter_info_item', body);
};

export const addDiagnosisDescription = ({ id, text }) => {
  return axios.post('/icenna.user_api.practitioner.diagnosis_description', { id, text });
};

export const getDentalCharting = () => {
  return axios.get('/icenna.user_api.practitioner.get_dental_charting');
};

export const encounterCheckout = (body) => {
  return axios.post('/icenna.user_api.practitioner.encounter_checkout', body);
};

export const checkApproval = (body) => {
  return axios.post('/icenna.user_api.practitioner.check_approval', body);
};

export const sendReply = (body) => {
  return axios.post('/icenna.user_api.practitioner.communication_reply', body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
};

export const findPatient = ({ queryKey }) => {
  const [_, text] = queryKey;

  return axios.get('/icenna.user_api.practitioner.find_patient', {
    params: {
      text,
    }
  });
};
