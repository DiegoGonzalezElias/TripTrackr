import { authService } from '@/modules/auth/application/auth.service';
import { useAuth } from './useAuth';
import { createAuthRepository } from '@/modules/auth/infrastructure/auth.repository';
import { useRef, useState } from 'react';
import validator from 'validator';

export const useRegister = () => {
    const { setAccessToken, setUser } = useAuth();
    const usernameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const confirmPasswordRef = useRef<HTMLInputElement | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const register = async (email: string, password: string, confirmPassword: string) => {
        try {
            const authServiceImpl = authService(createAuthRepository())
            const data = await authServiceImpl.registerUser({ email, password, confirmPassword });
            setAccessToken(data.accessToken);
            setUser(data.user);

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

        const username = usernameRef.current?.value || "";
        const password = passwordRef.current?.value || "";
        const confirmPassword = confirmPasswordRef.current?.value || "";

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


    return { handleRegister, usernameRef, passwordRef, confirmPasswordRef, loading, error };
};
