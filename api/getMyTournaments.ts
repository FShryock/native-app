import axios from 'axios';
import { API_BASE_URL } from '@env';
import { CalendarItemType } from '../types';

export async function getMyTournaments(token: string): Promise<Array<CalendarItemType>> {
    try {
        const response = await axios.get(`${API_BASE_URL}/my-tournaments/`,
            {headers: {Authorization: `Bearer ${token}`}}
        );
        console.log('Paco Response: ', response.data as CalendarItemType);
        return response.data;
    } catch (error: any) {
        console.error("Registration failed:", error.response?.data || error.message);
        throw error;
    }
}