// src/services/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://your-firebase-project.firebaseio.com/', // Zamijeni sa svojim Firebase URL-om
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
