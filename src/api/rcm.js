import axios from './axios-instance';

export const getPatientEncounters = () => {
  return axios.get('/icenna.user_api.rcm.get_patient_encounters',);
};

export const getApprovals = ({ queryKey }) => {
  const [_, page, page_size] = queryKey;

  return axios.get('/icenna.user_api.rcm.get_approvals', {
    params: {
      page,
      page_size,
    },
  });
};

export const getClaims = ({ queryKey }) => {
  const [_, page, page_size] = queryKey;

  return axios.get('/icenna.user_api.rcm.get_claims', {
    params: {
      page,
      page_size,
    },
  });
};

export const getApprovalDetails = ({ queryKey }) => {
  const [_, id,] = queryKey;

  return axios.get('/icenna.user_api.rcm.get_approval_details', {
    params: {
      id,
    },
  });
};
