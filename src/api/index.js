import axios from 'axios';

export  const api = axios.create({
    baseURL: 'https://303e6f26.ngrok.io',
    timeout: 5000,
  });
  export const authorizeApi = (token = null) => {
    api.defaults.headers.common['Authorization'] = token;
  };
