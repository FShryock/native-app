import React, { useEffect, useCallback, useState } from "react";
import * as SplashScreen from 'expo-splash-screen';
import RootNavigator from "./navigation/RootNavigator";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { UserProvider } from "./contexts/UserContext";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Add any async startup work here (fonts, cached tokens, etc.)
      } catch (e) {
        console.warn(e);
      } finally {
        setAppReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appReady) {
      await SplashScreen.hideAsync();
    }
  }, [appReady]);

  if (!appReady) return null;

  return (
    <UserProvider>
      <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <RootNavigator />
      </GestureHandlerRootView>
    </UserProvider>
  );
}
