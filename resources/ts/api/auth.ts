import api from '../lib/axios';

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

export async function getCsrfCookie() {
  await api.get('/sanctum/csrf-cookie', { baseURL: '' });
}

export async function login(email: string, password: string): Promise<User> {
  const { data } = await api.post<{ user: User }>('/login', {
    email,
    password,
  });
  return data.user;
}

export async function register(userData: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}): Promise<User> {
  const { data } = await api.post<{ user: User }>('/register', userData);
  return data.user;
}

export async function logout() {
  await api.post('/logout');
}
