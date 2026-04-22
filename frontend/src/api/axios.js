import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000'
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Проверяем был ли это запрос на token (чтобы избежать бесконечного цикла)
    const isTokenRequest = originalRequest?.url?.includes('token/') || originalRequest?._retry;
    
    // Только пытаемся обновить token если это 401 и это не запрос на token
    if (error.response?.status === 401 && !isTokenRequest) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh');
        if (!refreshToken) throw new Error('No refresh token');
        
        // Используем baseURL правильно
        const res = await api.post('api/token/refresh/', {
          refresh: refreshToken
        });
        
        localStorage.setItem('access', res.data.access);
        originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
        return api(originalRequest);
      } catch (err) {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        
        // Перенаправляем на логин если находимся в админ панели
        if (window.location.pathname.includes('/panel')) {
          window.location.href = '/panel/login';
        }
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
