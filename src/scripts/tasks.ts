import CustomError from "@/src/utils/custom-error";
import axios from "axios";
import { LoginProps } from "../types/auth-types";
import { Task } from "../types/task-types";
import { ApiUrl } from "./api-url";

export async function handleTasks({login, password}: LoginProps): Promise<Task[]> {
    try {
        const result = await axios.post(ApiUrl("/ub/ead-ub/tasks"), {
            login,
            password,
          });

        if (result.status === 200) {
            const data: Task[] = result.data.data;
            return data;
        } else {
            throw new CustomError(result.data.errors[0], "Ocorreu um erro ao pegar as tarefas.");
        }
    } catch (error) {
        console.log("error", error);
        throw new CustomError(
            "Error Tasks",
            "Ocorreu um erro interno, tente novamente mais tarde."
        );
    }
}