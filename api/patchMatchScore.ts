import axiosInstance from './axiosInstance';

export interface MatchScorePayload {
    score_a_g1: number;
    score_b_g1: number;
    score_a_g2: number;
    score_b_g2: number;
}

export async function patchMatchScore(matchId: number, payload: MatchScorePayload): Promise<void> {
    await axiosInstance.patch(`/matches/${matchId}/score/`, payload);
}
