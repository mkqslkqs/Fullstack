import axios from 'axios';


const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});


apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


apiClient.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      localStorage.removeItem('jwtToken');
      window.history.pushState({}, '', '/login'); 
      const navEvent = new PopStateEvent('popstate');
      window.dispatchEvent(navEvent);
      console.error("Authentication error. Redirecting to login.");
    }
    return Promise.reject(error);
  }
);


export const login = (credentials) => apiClient.post('/auth/login', credentials);
export const register = (userData) => apiClient.post('/auth/register', userData);
export const getProfile = () => apiClient.get('/auth/profile');



export const getTasks = () => apiClient.get('/tasks');
export const createTask = (taskData) => apiClient.post('/tasks', taskData);
export const updateTask = (taskId, taskData) => apiClient.put(`/tasks/${taskId}`, taskData);
export const deleteTask = (taskId) => apiClient.delete(`/tasks/${taskId}`);
export const getPublicTask = (taskId) => apiClient.get(`/tasks/public/${taskId}`); 


export default apiClient;

