import axios from './axios-instance';

export const getTerms = ({ queryKey }) => {
  const [_, id,] = queryKey;

  return axios.get('/icenna.user_api.settings.get_terms_and_conditions', {
    params: { id },
  });
};
