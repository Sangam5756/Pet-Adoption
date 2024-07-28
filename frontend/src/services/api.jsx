import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  // baseURL: 'https://petback5756.onrender.com',
  withCredentials: true,
});



export default api;
