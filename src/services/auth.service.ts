import api from './api';

class AuthService {
    private tokenKey = 'auth_token';

    setToken(token: string) {
        localStorage.setItem(this.tokenKey, token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    getToken() {
        return localStorage.getItem(this.tokenKey);
    }

    clearToken() {
        localStorage.removeItem(this.tokenKey);
        delete api.defaults.headers.common['Authorization'];
    }

    async login(email: string, password: string) {
        const response = await api.post('/sessions', { email, password });
        if (response.data.token) {
            this.setToken(response.data.token);
        }
        return response.data;
    }

    async logout() {
        await api.delete('/sessions');
        this.clearToken();
    }

    async checkAuth() {
        const token = this.getToken();
        if (!token) {
            return false;
        }

        try {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await api.get('/sessions');
            return response.data.authenticated;
        } catch (error) {
            this.clearToken();
            return false;
        }
    }
}

export const authService = new AuthService();
