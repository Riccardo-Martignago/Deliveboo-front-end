
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
    'Content-Type': 'application/json',
    },
});

export function getUser() {
    const token = localStorage.getItem('token');
    if (token) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return apiClient.get('/user');
}
