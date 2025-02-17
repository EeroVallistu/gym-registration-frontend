import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
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
        // Remove '/api' prefix from URL if it exists
        if (config.url?.startsWith('/api/')) {
            config.url = config.url.substring(4);
        }
        console.log('Making request to:', `${config.baseURL}${config.url}`, {
            method: config.method?.toUpperCase(),
            data: config.data,
            headers: config.headers
        });
        return config;
    },
    error => Promise.reject(error)
);

api.interceptors.response.use(
    response => {
        console.log('Received response:', response.status, response.data);
        return response;
    },
    error => {
        console.error('API Error:', {
            url: error.config?.url,
            method: error.config?.method,
            status: error.response?.status,
            data: error.response?.data
        });
        return Promise.reject(error);
    }
);

export default api;
