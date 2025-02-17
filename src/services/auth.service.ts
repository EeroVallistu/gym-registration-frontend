import api from './api';

class AuthService {
    async login(email: string, password: string): Promise<void> {
        try {
            const response = await api.post('/sessions', { email, password });
            const { token } = response.data;
            localStorage.setItem('token', token);
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    async logout(): Promise<void> {
        try {
            await api.delete('/sessions');
        } finally {
            localStorage.removeItem('token');
            delete api.defaults.headers.common['Authorization'];
        }
    }

    async checkAuth(): Promise<boolean> {
        const token = localStorage.getItem('token');
        if (!token) return false;

        try {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            await api.get('/sessions');
            return true;
        } catch {
            localStorage.removeItem('token');
            delete api.defaults.headers.common['Authorization'];
            return false;
        }
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }
}

export const authService = new AuthService();
