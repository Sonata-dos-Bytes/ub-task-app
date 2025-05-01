import React from "react";
import { useStorageState } from "@utils/useStorageState";
import type { AuthContextType, LoginProps } from "../types/Auth";
import { handleLogin } from "@scripts/Auth";

const AuthContext = React.createContext<AuthContextType>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

export function useSession() {
  const value = React.useContext(AuthContext);
  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  return (
    <AuthContext.Provider
      value={{
        signIn: async ({login, password}: LoginProps) => {
          const sessionUser = await handleLogin({login, password}); 

          if (sessionUser) {
            setSession(JSON.stringify(sessionUser));
          } else {
            throw new Error("Error Login");
          }
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
