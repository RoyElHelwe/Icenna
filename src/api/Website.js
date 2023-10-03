import axios from 'axios';

export const getWebsite = () => {
  return axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/method/icenna.user_api.website.get_website`, {
    headers: {
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
    }
  });
};
