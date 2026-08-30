import axiosInstance from './axiosInstance';
import { CalendarItemType } from '../types';

export async function getMyTournaments(): Promise<Array<CalendarItemType>> {
    const response = await axiosInstance.get('/my-tournaments/');
    return response.data;
}
