import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useUser } from "../contexts/UserContext";

export default function RootNavigator() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { accessToken } = useUser();

    // When the interceptor clears the token (expired + refresh failed), send user to login
    useEffect(() => {
        if (!accessToken) setIsLoggedIn(false);
    }, [accessToken]);

    const handleLogin = (value: boolean) => {
        setIsLoggedIn(value);
    };

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                {isLoggedIn
                    ? <MainNavigator handleLogin={handleLogin} />
                    : <AuthNavigator handleLogin={handleLogin} />
                }
            </NavigationContainer>
        </SafeAreaProvider>
    );
}