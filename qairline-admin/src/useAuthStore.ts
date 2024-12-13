import { create } from 'zustand';

interface AuthState {
    user: any;
    isLoggedIn: boolean;
    loading: boolean;
    setUser: (user: any) => void;
    setLogout: () => void;
    setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isLoggedIn: false,
    loading: false,
    setUser: (user) => set({ user, isLoggedIn: true }),
    setLogout: () => set({ user: null, isLoggedIn: false }),
    setLoading: (loading) => set({ loading }),
}));