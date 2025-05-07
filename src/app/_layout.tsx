import { SessionProvider } from "@/src/contexts/auth-context"
import { Slot } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { SafeAreaView } from "react-native"
import * as SplashScreen from "expo-splash-screen"
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
} from "@expo-google-fonts/poppins"
import { useEffect } from "react"

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
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
  })

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) return null

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <SessionProvider>
          <Slot />
          <StatusBar style="auto" />
        </SessionProvider>
      </SafeAreaView>
    </>
  )
}