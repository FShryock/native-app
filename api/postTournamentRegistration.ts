import axiosInstance from './axiosInstance';

export async function postTournamentRegistration(tournamentId: number, teamName: string): Promise<void> {
    const response = await axiosInstance.post(`/tournaments/${tournamentId}/register/`, {
        team_name: teamName,
        members: [],
    });
    console.log('Registered:', response.data);
}
