import { Slot } from "expo-router";
import { SessionProvider } from "@/src/contexts/AuthContext";

export default function RootLayout() {
    return (
        <SessionProvider>
            <Slot />
        </SessionProvider>
    );
}

