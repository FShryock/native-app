import axiosInstance from './axiosInstance';
import { poolMatch } from '../types';

export interface PoolMember {
    id: number;
    team: number;
    team_name: string;
    captain: string;
}

export interface Pool {
    id: number;
    name: string;
    matches: poolMatch[];
    teams: PoolMember[];
}

export async function getPools(tournamentId: number): Promise<Pool[]> {
    const response = await axiosInstance.get<Pool[]>(`/tournaments/${tournamentId}/pools/`);
    return response.data;
}
