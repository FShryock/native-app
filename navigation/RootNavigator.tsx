import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";



export default function RootNavigator() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = (value: boolean) => {
        setIsLoggedIn(value)
    }

    return(
        <SafeAreaProvider>
        <NavigationContainer>
            {isLoggedIn ? <MainNavigator handleLogin={handleLogin}/> : <AuthNavigator handleLogin={handleLogin}/>}
        </NavigationContainer>
         </SafeAreaProvider>
    );
}