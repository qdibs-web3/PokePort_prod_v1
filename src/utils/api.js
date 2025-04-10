import axios from 'axios';

// Determine the base URL for API requests based on environment
const getBaseUrl = () => {
  const isProduction = window.location.hostname !== 'localhost';
  
  if (isProduction) {
    // In production, use the production URL
    return 'https://poke-port-prod-v1.vercel.app';
  }
  
  // In development, explicitly use the backend server URL
  return 'http://localhost:5000';
};

// Create an axios instance with the appropriate base URL
const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token when available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
