// axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/', // Replace with your backend API base URL
  timeout: 5000, // Adjust timeout as needed
});

export default instance;
