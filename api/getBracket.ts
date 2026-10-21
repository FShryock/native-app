import axiosInstance from './axiosInstance';
import { BracketMatch } from '../types';

export async function getBracket(tournamentId: number): Promise<BracketMatch[]> {
    const response = await axiosInstance.get<BracketMatch[]>(`/tournaments/${tournamentId}/bracket/`);
    return response.data;
}
