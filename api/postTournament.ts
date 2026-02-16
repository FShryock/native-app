import { API_BASE_URL } from '@env';
import axios from 'axios';

type TourneyParams = {
    tourneyName: string,
    level: string,
    surface: string,
    format: string,
    gender: string,
    location: string,
    status: string,
    teams: number,
    prize_pool: string,
    date: string,
    registration_deadline: string
}

interface postTournamentProps {
    payload: TourneyParams
}


export async function postTournament(props: postTournamentProps) {
    try {
        console.log("paco payload in post Tournament", props)
        const payload = {
            name: props.payload.tourneyName,
            level: props.payload.level,
            surface: props.payload.surface,
            format: props.payload.format,
            gender: props.payload.gender,
            status: props.payload.status,
            location: props.payload.location,
            teams_limit: Number(props.payload.teams),
            prize_pool: props.payload.prize_pool,
            date: props.payload.date,
            registration_deadline: props.payload.registration_deadline
        }
        console.log("paco payload in post Tournament", payload)


        console.log('Paco Submitting tournament:', payload);

        const response = await axios.post(`${API_BASE_URL}/tournaments/`, payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('Paco Tournament created successfully:', response.data);
    } catch (error: any) {
        if (error.response) {
            console.error('Backend error:', error.response.data);
        } else {
            console.error('Unexpected error:', error.message);
        }
    }
}