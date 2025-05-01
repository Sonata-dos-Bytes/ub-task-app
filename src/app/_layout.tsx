import { Slot } from "expo-router";
import { SessionProvider } from "@context/AuthContext";

export default function RootLayout() {
    return (
        <SessionProvider>
            <Slot />
        </SessionProvider>
    );
}

