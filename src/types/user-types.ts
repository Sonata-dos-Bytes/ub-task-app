import { LoginProps } from "./auth-types";

export interface User {
    name: string;
    email: string;
    language: string;
    userInitials: string;
    userPicture: string;
    authorization: LoginProps;
}