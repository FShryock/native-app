import axiosInstance from './axiosInstance';

export async function generatePools(tournamentId: number): Promise<void> {
    await axiosInstance.post(`/tournaments/${tournamentId}/generate-pools/`, {});
}
