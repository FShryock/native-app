import axiosInstance from './axiosInstance';

export async function postTournamentRegistration(tournamentId: number, teamName: string, clubName?: string): Promise<void> {
    const response = await axiosInstance.post(`/tournaments/${tournamentId}/register/`, {
        team_name: teamName,
        ...(clubName ? { club_name: clubName } : {}),
        members: [],
    });
    console.log('Registered:', response.data);
}
