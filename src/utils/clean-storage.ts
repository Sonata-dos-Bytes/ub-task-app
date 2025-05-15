import { useStorageState } from "@/src/utils/use-storage-state";

export function useCleaners() {
  const [, setSession] = useStorageState("session");
  const [, setTasks] = useStorageState("tasks");

  const cleanAll = () => {
    setSession(null); 
    setTasks(null);   
  };

  return {
    cleanAll,
  };
}
