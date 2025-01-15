import { useEffect } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import "./global.css";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Merri: require("../assets/fonts/Merriweather-Regular.ttf"),
    "Merri-Bold": require("../assets/fonts/Merriweather-Bold.ttf"),
    TimesNewRoman: require("../assets/fonts/timesnewroman.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
