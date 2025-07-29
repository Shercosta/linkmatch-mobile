import { ENV } from '@/env';
import { useAuthStore } from '@/stores/auth';

const API_URL = ENV.API_URL;

export function be(endpoint: string): string {
    return `${API_URL}${endpoint}`;
}

export type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE';

export async function ApiFetcher(endpoint: string, method: MethodType) {
    // get auth token
    const token = useAuthStore.getState().token;
    console.log('API request from: ', endpoint)

    try {
        const response = await fetch(be(endpoint), {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API request failed with status:', response.status, errorText);
            throw new Error('API request failed');
        }

        const data = await response.json()
        return data;
    } catch (error: any) {
        console.error('API error:', error.message || error);
        throw error;
    }
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

export async function GetProfile() {
    const url = '/api/profile'
    const response = await ApiFetcher(url, 'GET')

    return response
}