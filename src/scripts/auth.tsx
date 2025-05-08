import CustomError from "@/src/utils/custom-error";
import axios from "axios";
import { LoginProps } from "../types/auth-types";
import { User } from "../types/user-types";
import { ApiUrl } from "./api-url";

export async function handleLogin({login, password}: LoginProps): Promise<User> {
    try {
        const result = await axios.post(ApiUrl("/ub/ead-ub/profile"), {
            login,
            password,
          });

        if (result.status === 200) {
            const data: User = {
                ...result.data.data,
                authorization: {
                    login: login,
                    password: password,
                }
            };
            return data;
        } else {
            throw new CustomError(result.data.errors[0], "Error_Login");
        }
    } catch (error) {
        console.log("error", error);
        throw new CustomError(
            "Error Login",
            "Error_Search_Point"
        );
    }
}