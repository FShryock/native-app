import axiosInstance from './axiosInstance';

export async function generatePools(tournamentId: number, numPools: number): Promise<void> {
    await axiosInstance.post(`/tournaments/${tournamentId}/generate-pools/`, { num_pools: numPools });
}
