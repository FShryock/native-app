import AsyncStorage from '@react-native-async-storage/async-storage'
import { API_BASE_URL } from '@env';
import { useState } from 'react';

export async function getLogin(username: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/token/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password}),
    });

    if (!response.ok) {
        throw new Error('Invalid Username or Password');
    }

    const data = await response.json();
    await AsyncStorage.setItem('access', data.access);
    await AsyncStorage.setItem('refresh', data.refresh);

    return data;
}

export async function refreshToken() {
    const refresh = await AsyncStorage.getItem('refresh');
    if (!refresh) throw new Error('No refresh token found');

    const response = await fetch(`${API_BASE_URL }/api/token/refresh/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ refresh })
    });

    if (!response.ok) {
        throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    await AsyncStorage.setItem('access', data.access);
    return data.access;
}
