import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@env';

let _setAccessToken: ((token: string | null) => void) | null = null;
let _handleLogout: (() => void) | null = null;

export function registerTokenSetter(fn: (token: string | null) => void) {
    _setAccessToken = fn;
}

export function registerLogoutHandler(fn: () => void) {
    _handleLogout = fn;
}

const axiosInstance = axios.create({ baseURL: API_BASE_URL });

// Attach the stored access token to every outgoing request
axiosInstance.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('access');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// On 401: refresh token, update storage + context, retry once
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const original = error.config;
        if (error.response?.status === 401 && !original._retry) {
            original._retry = true;
            try {
                const refresh = await AsyncStorage.getItem('refresh');
                if (!refresh) throw new Error('No refresh token');

                const res = await axios.post(`${API_BASE_URL}/token/refresh/`, { refresh });
                const newAccess: string = res.data.access;

                await AsyncStorage.setItem('access', newAccess);
                _setAccessToken?.(newAccess);

                original.headers.Authorization = `Bearer ${newAccess}`;
                return axiosInstance(original);
            } catch {
                await AsyncStorage.multiRemove(['access', 'refresh']);
                _setAccessToken?.(null);
                _handleLogout?.();
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
