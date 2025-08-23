import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import TournamentScreen from "../screens/TournamentScreen";
import TeamScreen from "../screens/TeamScreen";
import MapScreen from "../screens/MapScreen";
import { TouchableOpacity, View } from "react-native";

export type MainTabParamList = {
  Home: undefined;
  Tournament: undefined;
  Map: undefined;
  Teams: undefined;
};

interface MainTabsProps {
  handleLogin: (value: boolean) => void;
}

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabs(props: MainTabsProps) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;
          if (route.name === "Home") iconName = "home-outline";
          else if (route.name === "Map") iconName = "map-outline";
          else if (route.name === "Tournament") iconName = "trophy-outline";
          else iconName = "people-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ff5722',    // active icon color
        tabBarInactiveTintColor: '#f7f7f7',     // inactive icon color
        tabBarStyle: {
        backgroundColor: '#181818',        // tab bar background color
        },
        headerShown: true,
        headerTitle: "Volley-Connect",
        headerTitleAlign: "left",
        // headerStyle: { backgroundColor: "#f7f7f7" },
        headerStyle: { backgroundColor: "#181818" },
        headerTintColor: "#ff5722",
        // Add your top-right buttons back
        headerRight: () => (
          <View style={{ flexDirection: "row", gap: 15, marginRight: 10 }}>
            <TouchableOpacity onPress={() => props.handleLogin(false)}>
              <Ionicons name="log-out-outline" size={24} color="#ff5722" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log("Action 1")}>
              <Ionicons name="notifications-outline" size={24} color="#f7f7f7" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log("Action 2")}>
              <Ionicons name="settings-outline" size={24} color="#f7f7f7" />
            </TouchableOpacity>
          </View>
        ),
      })}
    >
      <Tab.Screen
        name="Home"
        children={(screenProps) => (
          <HomeScreen {...screenProps} handleLogin={props.handleLogin} />
        )}
      />
      <Tab.Screen name="Tournament" component={TournamentScreen} />
      <Tab.Screen name="Teams" component={TeamScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
    </Tab.Navigator>
  );
}
