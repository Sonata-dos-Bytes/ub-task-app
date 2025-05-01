import { Slot } from "expo-router";
import { SessionProvider } from "@/src/contexts/AuthContext";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";

export default function RootLayout() {
    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <SessionProvider>
                    <Slot />
                    <StatusBar style="auto" />
                </SessionProvider>
            </SafeAreaView>
        </>
    );
}

