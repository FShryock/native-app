import React, { createContext, useState, useContext, useEffect } from "react";
import { registerTokenSetter } from '../api/axiosInstance';

interface UserContextType {
    userInfo: any;
    setUserInfo: (info: any) => void;
    accessToken: string | null;
    setAccessToken: (token: string | null) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [userInfo, setUserInfo] = useState(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        registerTokenSetter(setAccessToken);
    }, []);

    const logout = () => {
        setUserInfo(null);
        setAccessToken(null);
    };

    return (
        <UserContext.Provider value={{ userInfo, setUserInfo, accessToken, setAccessToken, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    const ctx = useContext(UserContext);
    if (!ctx) throw new Error('useUser must be used inside UserProvider');
    return ctx;
};