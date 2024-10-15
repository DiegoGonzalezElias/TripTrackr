import { authService } from '@/modules/auth/application/auth.service';
import { useAuth } from './useAuth';
import { createAuthRepository } from '@/modules/auth/infrastructure/auth.repository';
import { useState } from 'react';

export const useLogin = () => {
    const { setAccessToken } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const login = async (email: string, password: string) => {
        try {
            const authServiceImpl = authService(createAuthRepository())
            const data = await authServiceImpl.loginUser({ email, password });
            setAccessToken(data.accessToken);

            return data;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await login(username, password);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setError('Invalid email or password');
        } finally {
            setLoading(false);
        }
    };


    return { handleLogin, username, setUsername, password, setPassword, loading, error };
};
