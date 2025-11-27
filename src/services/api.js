import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-mensagens-fq1p.onrender.com',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  config.headers = config.headers || {};
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
    try {
      // mostra apenas prefixo para ajudar depuração sem vazar todo token
      console.debug('API: enviando token, prefixo=', token.slice(0, 8));
    } catch (e) {}
  } else {
    console.debug('API: nenhum token no localStorage');
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      localStorage.removeItem('token');
      // redireciona para login no frontend
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
