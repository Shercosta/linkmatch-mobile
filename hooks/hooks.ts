import { ENV } from '@/env';
import { useAuthStore } from '@/stores/auth';

const API_URL = ENV.API_URL;

export function be(endpoint: string): string {
    return `${API_URL}${endpoint}`;
}

export async function Login(username: string, password: string) {
    const url = be('/auth/login');
    console.log('Attempting to log in with:', url, { username, password });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Login failed with status:', response.status, errorText);
            throw new Error('Login failed');
        }

        const data = await response.json();
        console.log('Login successful:', data);

        // set the token and username in Zustand store
        useAuthStore.getState().setAuth(
            data.data.token,
            data.data.username
        )

        return data;
    } catch (err: any) {
        console.error('Login error:', err.message || err);
        throw err;
    }
}
