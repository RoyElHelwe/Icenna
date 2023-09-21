import axios from './axios-instance';

export const getPatientEncounters = ({ queryKey }) => {
  const [_, page, page_size] = queryKey;

  return axios.get('/icenna.user_api.rcm.get_patient_encounters', {
    params: {
      page,
      page_size,
    },
  });
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

export const updateApproval = (body) => {
  return axios.post('/icenna.user_api.rcm.update_claim', body);
};

export const submitApproval = (body) => {
  return axios.post('/icenna.user_api.rcm.submit_request', body);
};
