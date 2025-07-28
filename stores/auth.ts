import { create } from 'zustand';

interface AuthState {
    token: string | null;
    username: string | null;
    isAuthenticated: boolean;
    setAuth: (token: string, username: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    username: null,
    isAuthenticated: false,
    setAuth: (token, username) =>
        set({ token, username, isAuthenticated: true }),
    logout: () =>
        set({ token: null, username: null, isAuthenticated: false }),
}));
