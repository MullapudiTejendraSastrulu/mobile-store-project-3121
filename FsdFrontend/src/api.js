import axios from 'axios';

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || '/api' });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export const registerUser  = (data) => API.post('/register', data);
export const loginUser     = (data) => API.post('/login', data);
export const getMobiles    = ()     => API.get('/mobiles');
export const addMobile     = (data) => API.post('/addmobile', data);
export const updateMobile  = (id, data) => API.put(`/updatemobile/${id}`, data);
export const deleteMobile  = (id)   => API.delete(`/deletemobile/${id}`);
