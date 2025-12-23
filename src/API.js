import axios from 'axios';

// Use relative path for Vercel serverless functions
// In production, this will resolve to /api/chat or /api/voice-chat
// In development with Vite, we may need to proxy or use full URL
const API = axios.create({
  baseURL: import.meta.env.PROD ? '' : '', // Empty for relative paths
  withCredentials: false, // Not needed for serverless functions
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
