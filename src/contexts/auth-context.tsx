import { handleLogin } from "@/src/scripts/auth";
import { useStorageState } from "@/src/utils/use-storage-state";
import React from "react";
import type { AuthContextType, LoginProps } from "../types/auth-types";
import { useCleaners } from "../utils/clean-storage";
import { saveBase64ToFile } from "../utils/image-utils";

const AuthContext = React.createContext<AuthContextType>({
  signIn: () => null,
  signOut: () => null,
  user: () => null,
  session: null,
  isLoading: false,
});

export function useSession() {
  const value = React.useContext(AuthContext);
  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const { cleanAll } = useCleaners();

  return (
    <AuthContext.Provider
      value={{
        signIn: async ({login, password}: LoginProps) => {
          const sessionUser = await handleLogin({login, password}); 

          if (sessionUser) {
            const userPicture = await saveBase64ToFile(sessionUser.userPicture, "userPicture", "avatar/"); 

            setSession(JSON.stringify({
              ...sessionUser,
              userPicture: userPicture,
            }));
          } else {
            throw new Error("Error Login");
          }
        },
        signOut: () => {
          setSession(null);
          cleanAll();
        },
        user: () => {
          return session ? JSON.parse(session) : null;
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
