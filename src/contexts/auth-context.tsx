import { handleLogin } from "@/src/scripts/auth";
import { useStorageState } from "@/src/utils/use-storage-state";
import React from "react";
import type { AuthContextType, LoginProps } from "../types/auth-types";
import { handleTasks } from "../scripts/tasks";

const AuthContext = React.createContext<AuthContextType>({
  signIn: () => null,
  signOut: () => null,
  user: () => null,
  getTasks: () => null,
  tasks: null,
  session: null,
  isLoading: false,
});

export function useSession() {
  const value = React.useContext(AuthContext);
  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [[isLoadingTasks, tasksStorage], setTasks] = useStorageState("tasks");

  const [tasks, setTasksInContext] = React.useState(
    tasksStorage ? JSON.parse(tasksStorage) : null
  );

  React.useEffect(() => {
    if (tasksStorage) {
      setTasksInContext(JSON.parse(tasksStorage));
    }
  }, [tasksStorage]);

  const fetchTasks = async ({ login, password }: LoginProps) => {
    const newTasks = await handleTasks({ login, password });

    if (newTasks) {
      setTasks(JSON.stringify(newTasks));
      setTasksInContext(newTasks);
      return newTasks;
    } else {
      throw new Error("Falha ao buscar tarefas");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn: async ({login, password}: LoginProps) => {
          const sessionUser = await handleLogin({login, password}); 

          if (sessionUser) {
            setSession(JSON.stringify(sessionUser));
            await fetchTasks({ login, password });
          } else {
            throw new Error("Error Login");
          }
        },
        signOut: () => {
          setSession(null);
        },
        user: () => {
          return session ? JSON.parse(session) : null;
        },
        getTasks: async ({login, password}: LoginProps) => {
          const newTasks = await handleTasks({ login, password });

          if (newTasks) {
            setTasks(JSON.stringify(newTasks)); 
            setTasksInContext(newTasks);
            return JSON.stringify(newTasks);
          } else {
            throw new Error("Falha ao buscar tarefas");
          }
        },
        tasks,
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
