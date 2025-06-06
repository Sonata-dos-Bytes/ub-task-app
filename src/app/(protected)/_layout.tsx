import { Redirect, Stack } from "expo-router";
import { Text } from "react-native";
import { useSession } from "@/src/contexts/auth-context";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
} from "@expo-google-fonts/poppins";
import { useEffect } from "react";

export const unstable_settings = {
  initialRouteName: "(protected)/(tabs)",
};

export default function ProtectedLayout() {
  const { session, isLoading } = useSession();
  const [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (isLoading) {
    return <Text>Loading session…</Text>;
  }

  if (!fontsLoaded) {
    return null; 
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="tasks/task"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
