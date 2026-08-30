import axiosInstance from './axiosInstance';

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
        const response = await axiosInstance.get<Tournament[]>('/tournaments/');
        return response.data;
    } catch (error) {
        console.error('Error fetching tournaments:', error);
        return [];
    }
}
