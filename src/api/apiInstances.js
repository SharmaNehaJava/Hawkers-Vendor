import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://hawkers-backend.onrender.com', 
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const vendorInfo = localStorage.getItem('vendorInfo');
    if (vendorInfo) {
      const { token } = JSON.parse(vendorInfo);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.error('Token is missing. Please log in.');
      }
    } else {
      console.error('Vendor info is missing. Please log in.');
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
