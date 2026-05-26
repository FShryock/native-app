
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