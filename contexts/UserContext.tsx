import React, { createContext, useState, useContext } from "react";

const UserContext = createContext(null);

export function UserProvider ({children}) {
    const [userInfo, setUserInfo] = useState(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    return (
        <UserContext.Provider value={{userInfo, setUserInfo, accessToken, setAccessToken}}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);