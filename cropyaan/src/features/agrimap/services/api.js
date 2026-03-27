import axios from 'axios';

const API_URL = import.meta.env.VITE_AGRIMAP_API_URL || 'https://agrimap-insights.onrender.com';

const api = axios.create({
  baseURL: API_URL,
  timeout: 45000, // 45s for Render cold starts
});

const apiService = {
  getInsights: (lat, lng) => api.get('/api/location', { params: { lat, lng } }),
  searchLocation: (query) => api.get('/api/search', { params: { q: query } }),
  client: api,
};

export default apiService;
