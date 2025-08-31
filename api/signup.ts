import { API_BASE_URL } from '@env';

export interface SignUpPayload {
    first_name: string,
    last_name: string,
    email: string, 
    username: string,
    password: string
}

export interface ApiResponse<T> {
    success: boolean, 
    data?: T,
    error?: string
}

export default async function signUp<T>(payload: SignUpPayload): Promise<ApiResponse<T>> {
    try{
        const response = await fetch(`${API_BASE_URL}/register/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errMsg = await response.text();
            throw new Error(errMsg || "Signup failed");
        }

        const data = await response.json();
        return { success: true, data};
    } catch (err:any) {
        return { success: false, error: err.message};
    }
}