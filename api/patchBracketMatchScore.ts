import axiosInstance from './axiosInstance';

export interface BracketScorePayload {
    score_a: number;
    score_b: number;
    version: number;
}

export async function patchBracketMatchScore(matchId: number, payload: BracketScorePayload): Promise<void> {
    await axiosInstance.patch(`/bracket-matches/${matchId}/score/`, payload);
}
