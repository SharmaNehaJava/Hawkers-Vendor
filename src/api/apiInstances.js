import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000', 
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.error('Token is missing. Please log in.');
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
