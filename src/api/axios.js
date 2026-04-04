import axios from 'axios';

// Используем relative URL для разработки или переменные окружения VITE_API_URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.daniyaldamu.kz',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Централизованная обработка ошибок
    console.error('API Error:', error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
