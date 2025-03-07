import axios from 'axios';

const api = axios.create({
    baseURL: '/api',  // Changed from http://localhost:3000 to /api
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Initialize token from localStorage if it exists
const token = localStorage.getItem('token');
if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

api.interceptors.request.use(
    config => {
        return config;
    },
    error => Promise.reject(error)
);

api.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);

export default api;
