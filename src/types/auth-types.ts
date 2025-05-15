import { User } from "./user-types";

export interface AuthContextType {
    signIn: ({login, password}: LoginProps) => void;
    signOut: () => void;
    user: () => User | null;
    session?: string | null;
    isLoading: boolean;
}

export interface LoginProps {
    login: string;
    password: string;
}