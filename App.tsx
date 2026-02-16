import React from "react";
import RootNavigator from "./navigation/RootNavigator";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { UserProvider } from "./contexts/UserContext"


export default function App() {
  return (
    <UserProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootNavigator /> 
      </GestureHandlerRootView>
    </UserProvider>
  );
}


