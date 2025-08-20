import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainTabs from "./MainTabs";
import ScoreKeeperScreen from "../screens/ScoreKeeperScreen";

export type RootStackParamList = {
  MainTabs: undefined;
  ScoreKeeper: undefined;
};

interface MainNavigatorProps {
  handleLogin: (value: boolean) => void;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function MainNavigator(props: MainNavigatorProps) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs">
        {(screenProps) => <MainTabs {...screenProps} handleLogin={props.handleLogin} />}
      </Stack.Screen>
      <Stack.Screen
        name="ScoreKeeper"
        component={ScoreKeeperScreen}
        options={{ headerShown: true, title: "Score Keeper" }}
      />
    </Stack.Navigator>
  );
}
