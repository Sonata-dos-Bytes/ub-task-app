import { useState, useEffect, useCallback } from "react";
import { StatusTask, Task } from "@/src/types/task-types";
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
            fetchTasks();
            setTasks([]);
        }
    }, [session]);

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

    const getTasksBy = useCallback(
        ({
            include,
            exclude,
        }: {
            include?: StatusTask | StatusTask[];
            exclude?: StatusTask | StatusTask[];
        }) => {
            return tasks.filter((task) => {
                const included = include
                    ? (Array.isArray(include) ? include : [include]).includes(task.status)
                    : true;

                const excluded = exclude
                    ? (Array.isArray(exclude) ? exclude : [exclude]).includes(task.status)
                    : false;

                return included && !excluded;
            });
        },
        [tasks]
    );

    return {
        tasks,
        loading,
        error,
        fetchTasks,
        clean,
        getTasksBy
    };
}