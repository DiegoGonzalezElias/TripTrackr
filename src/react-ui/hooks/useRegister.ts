import { authService } from '@/modules/auth/application/auth.service';
import { useAuth } from './useAuth';
import { createAuthRepository } from '@/modules/auth/infrastructure/auth.repository';
import { useState } from 'react';
import validator from 'validator';

export const useRegister = () => {
    const { setAccessToken } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const register = async (email: string, password: string, confirmPassword: string) => {
        try {
            const authServiceImpl = authService(createAuthRepository())
            const data = await authServiceImpl.registerUser({ email, password, confirmPassword });
            setAccessToken(data.accessToken);

            return data;
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!validator.isEmail(username)) {
            setError('It is not a valid email')
            setLoading(false);
            return
        }

        if (password !== confirmPassword) {
            setError('Passwords are not equal')
            setLoading(false);
            return
        }

        try {
            await register(username, password, confirmPassword);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setError('Invalid email or password');
        } finally {
            setLoading(false);
        }
    };


    return { handleRegister, username, setUsername, password, setPassword, confirmPassword, setConfirmPassword, loading, error };
};
