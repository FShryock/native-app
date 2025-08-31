import axios from 'axios';
import { API_BASE_URL } from '@env';

export interface Tournament {
    id: number, 
    name: string,
    date: string,
    location: string,
    format: string, 
    gender: string,
    level: string,
    status: string,
    surface: string,
    registration_deadline: string,
    teams_limit: string,
    prize_pool: string
}

export default async function getTournaments(): Promise<Tournament[]> {
    try {
        const response = await axios.get<Tournament[]>(`${API_BASE_URL}/tournaments/`);
        return response.data;
    } catch (error){
        console.error('Error fetching local tournaments: ', error);
        return [];
    }

}