import { useState, useEffect, useCallback } from "react";
import { Task } from "@/src/types/task-types";
import { LoginProps } from "../types/auth-types";
import { handleTasks } from "@/src/scripts/tasks";
import { useSession } from "@/src/contexts/auth-context";

export function useTasks() {
    const { user } = useSession();
    const userData = user();

    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTasks = useCallback(async () => {
        if (!userData) return;

        setLoading(true);
        setError(null);

        try {
            const data = await handleTasks(userData.authorization);
            setTasks(data);
            // console.log("Tarefas carregadas com sucesso:", data);
        } catch (err: any) {
            setError(err?.message ?? "Erro ao carregar as tarefas.");
        } finally {
            setLoading(false);
        }
    }, [userData]);

    return {
        tasks,
        loading,
        error,
        fetchTasks,
    };
}