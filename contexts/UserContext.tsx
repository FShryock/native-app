import React, { createContext, useState, useContext } from "react";

const UserContext = createContext(null);

export function UserProvider ({children}) {
    const [userInfo, setUserInfo] = useState(null);

    return (
        <UserContext.Provider value={{userInfo, setUserInfo}}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);