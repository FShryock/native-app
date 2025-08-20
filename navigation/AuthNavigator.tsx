import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from '../screens/LoginScreen';

interface AuthNavigatorProps {
    handleLogin: (value: boolean) => void
}

export type AuthStackParamList = {
    Login: undefined; 
}

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator(props: AuthNavigatorProps) { 
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Login" 
                children={(screenProps) => (
                    <LoginScreen {...screenProps} handleLogin={props.handleLogin} />
                )} 
            />
        </Stack.Navigator>
    );
}

