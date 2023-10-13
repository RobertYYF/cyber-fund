import axios from 'axios';

const api = axios.create();

// 拦截器, JWT鉴权
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default api;