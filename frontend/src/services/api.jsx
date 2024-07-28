import axios from 'axios';

const api = axios.create({
  baseURL: 'https://petfriend5756.onrender.com',
  // baseURL: 'https://petback5756.onrender.com',
  withCredentials: true,
});



export default api;
