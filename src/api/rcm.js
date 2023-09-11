import axios from './axios-instance';

export const getPatientEncounters = () => {
    return axios.get('/icenna.user_api.rcm.get_patient_encounters',);
};
