import { AuthProvider } from 'react-admin';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useAuthStore } from './useAuthStore';

const apiUrl = 'http://localhost:8000/users';

const isAccessTokenExpired = (accessToken: string) => {
    try {
        const decodedToken: any = jwtDecode(accessToken);
        return decodedToken.exp < Date.now() / 1000;
    } catch (err) {
        return true;
    }
};

const getRefreshToken = async (refresh_token: string) => {
    try {
        const response = await axios.post(`${apiUrl}/token/refresh/`, {
            refresh: refresh_token,
        });
        return response.data;
    } catch (error) {
        console.error("Failed to refresh token", error);
        throw error;
    }
};

const setAuthUser = (access_token: string, refresh_token: string) => {
    if (isAccessTokenExpired(access_token)) {
        useAuthStore.getState().setLogout();
        return;
    }

    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);

    const user: any = jwtDecode(access_token) ?? null;

    if (user) {
        useAuthStore.getState().setUser(user);
        useAuthStore.setState({ isLoggedIn: true });
    } else {
        useAuthStore.getState().setLogout();
    }
    useAuthStore.getState().setLoading(false);
};

const authProvider: AuthProvider = {
    login: async ({ username, password }) => {
        const request = new Request(`${apiUrl}/token/`, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        const response = await fetch(request);
        const data = await response.json();
        setAuthUser(data.access, data.refresh);
    },
    checkError: async (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            try {
                const refreshToken = localStorage.getItem('refresh_token');
                if (refreshToken) {
                    const response = await getRefreshToken(refreshToken);
                    const { access } = response as { access: string }
                    setAuthUser(access, refreshToken);
                    return Promise.resolve();
                }
            } catch (e) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                return Promise.reject();
            }
        }
        return Promise.resolve();
    },
    checkAuth: () => {
        const accessToken = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');
        if (!accessToken || !refreshToken) {
            return Promise.reject();
        }
        if (isAccessTokenExpired(accessToken)) {
            return getRefreshToken(refreshToken)
                .then(response => {
                    const { access } = response as { access: string };
                    setAuthUser(access, refreshToken);
                    return Promise.resolve();
                })
                .catch(() => {
                    return Promise.reject();
                });
        }
        return Promise.resolve();
    },
    logout: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        useAuthStore.getState().setUser(null);
        useAuthStore.setState({ isLoggedIn: false });
        return Promise.resolve();
    },
    getPermissions: () => Promise.resolve(),
};

export default authProvider;