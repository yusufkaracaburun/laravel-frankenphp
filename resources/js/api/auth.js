import api from '../lib/axios';

export async function getCsrfCookie() {
    await api.get('/sanctum/csrf-cookie', { baseURL: '' });
}

export async function login(email, password) {
    const { data } = await api.post('/login', { email, password });
    return data.user;
}

export async function register(userData) {
    const { data } = await api.post('/register', userData);
    return data.user;
}

export async function logout() {
    await api.post('/logout');
}
