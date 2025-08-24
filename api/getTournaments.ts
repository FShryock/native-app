import axios from 'axios';

export interface Tournament {
    id: number, 
    name: string,
    date: string,
    location: string
}
// testing from physical device
// change local host to actual IP address of local front end application
// run this command on terminal 'ipconfig getifaddr en0'
// using django run this command to start server 'python manage.py runserver 0.0.0.0:8000'
// will have to add your IP to ALLOWED_HOST  =[] in settings.py
const API_URL = 'http://localhost:8000/api';

export default async function getTournaments(): Promise<Tournament[]> {
    try {
        const response = await axios.get<Tournament[]>(`${API_URL}/tournaments/`);
        return response.data;
    } catch (error){
        console.error('Error fetching local tournaments: ', error);
        return [];
    }

}