// axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://backend-npm-1.onrender.com/', // Replace with your backend API base URL
  timeout: 5000, // Adjust timeout as needed
});

export default instance;
