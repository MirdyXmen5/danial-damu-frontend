import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
// baseURL: '/api' // URL to Django backend
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
    // Prevent retry loops
    if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== '/token/') {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh');
        if (!refreshToken) throw new Error('No refresh token');
        
        const res = await axios.post('https://danial-damu-frontend.onrender.com/api/token/refresh/', {
          refresh: refreshToken
        });
        
        localStorage.setItem('access', res.data.access);
        originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
        return api(originalRequest);
      } catch (err) {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        
        // Redirect only if we are in the admin panel
        if (window.location.pathname.includes('/panel')) {
          const base = window.location.hostname.includes('github.io') ? '/danial-damu-frontend' : '';
          window.location.href = `${base}/panel/login`;
        }
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
