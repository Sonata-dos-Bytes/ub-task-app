import { LoginProps } from "./auth-types";

export interface User {
    name: string;
    email: string;
    language: string;
    user_initials: string;
    user_picture: string;
    authorization: LoginProps;
}