import axios from "axios";

export const getDicomFile = (url, token) => {
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/dicom; transfer-syntax=*;',
    },
    responseType: 'arraybuffer',
  });
};
