
export type CalendarItemType = {
    id: number,
    registered_at: string,
    tournament: Tournament,
    user: number
}

export type Tournament = {
    date: string,
    format: string,
    genger: string,
    id: number,
    level: string,
    location: string,
    name: string,
    prize_pool: string,
    registration_deadline: string,
    status: string,
    surface: string,
    teams_limit: number
}

export type BracketMatch = {
    id: number,
    round: number,
    position: number,
    team_a: number | null,
    team_a_name: string | null,
    team_b: number | null,
    team_b_name: string | null,
    score_a: number | null,
    score_b: number | null,
    winner: number | null,
    version: number,
}

export type poolMatch = {
    id: number,
    is_complete: boolean,
    pool: number,
    score_a_g1: number | null,
    score_a_g2: number | null,
    score_b_g1: number | null,
    score_b_g2: number | null,
    team_a: number,
    team_a_name: string,
    team_b: number,
    team_b_name: string,
    version: number,
    court_number: number | null,
    scheduled_time: string | null,
}