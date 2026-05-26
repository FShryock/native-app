import { API_BASE_URL } from '@env';
import axios from 'axios';

export async function postTournamentRegistration(tournamentId: number, token: string) {
    try {
        const response = await axios.post(`${API_BASE_URL}/tournament-registration/`,
            {tournament_id: tournamentId},
            {headers: {Authorization: `Bearer ${token}`}}
        );
        console.log('Registered: ', response.data);
    } catch (error: any) {
        console.error("Registration failed:", error.response?.data || error.message);
    }
}