import axios from 'axios';


export  const api = axios.create({
    baseURL: 'https://2e68987e.ngrok.io',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'},
  });
