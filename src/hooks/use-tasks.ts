import { useState, useEffect, useCallback } from "react";
import { Task } from "@/src/types/task-types";
import { handleTasks } from "@/src/scripts/tasks";
import { useSession } from "@/src/contexts/auth-context";
import { useStorageState } from "../utils/use-storage-state";

export function useTasks() {
    const { user } = useSession();
    const [[isLoading, session], setSession] = useStorageState("tasks");

    const userData = user();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (session) {
            setTasks(JSON.parse(session));
        } else {
            setTasks([]);
        }
        fetchTasks();
    }, [session]);

    const hasTasks = tasks && Object.values(tasks).length > 0;

    const fetchTasks = useCallback(async () => {
        if (!userData) return;

        setLoading(true);
        setError(null);

        try {
            const data = await handleTasks(userData.authorization);
            setTasks(data);
            setSession(JSON.stringify(data));
        } catch (err: any) {
            setError(err?.message ?? "Erro ao carregar as tarefas.");
        } finally {
            setLoading(false);
        }
    }, [userData]);

    const clean = useCallback(() => {
        setSession(null);
    }, []);

    return {
        tasks,
        loading,
        error,
        fetchTasks,
        clean,
        hasTasks,
    };
}