import { authService } from '@/modules/auth/application/auth.service';
import { useAuth } from './useAuth';
import { createAuthRepository } from '@/modules/auth/infrastructure/auth.repository';
import { useRef, useState } from 'react';
import validator from 'validator';

export const useLogin = () => {
    const { setAccessToken, setUser } = useAuth();
    const usernameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (email: string, password: string) => {
        try {
            const authServiceImpl = authService(createAuthRepository());
            const data = await authServiceImpl.loginUser({ email, password });
            setAccessToken(data.accessToken);
            setUser(data.user);

            return data;
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const username = usernameRef.current?.value || "";
        const password = passwordRef.current?.value || "";

        if (!validator.isEmail(username)) {
            setError("It is not a valid email");
            setLoading(false);
            return;
        }

        try {
            await login(username, password);
        } catch {
            setError("Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return {
        handleLogin,
        usernameRef,
        passwordRef,
        loading,
        error,
    };
};