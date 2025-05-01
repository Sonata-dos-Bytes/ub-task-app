export interface AuthContextType {
    signIn: ({login, password}: LoginProps) => void;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
}

export interface LoginProps {
    login: string;
    password: string;
}