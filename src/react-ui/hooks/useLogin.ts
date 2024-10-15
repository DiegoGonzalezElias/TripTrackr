import { useAuth } from './useAuth';

export const useLogin = () => {
    const { setAccessToken } = useAuth();

    const login = async (email: string, password: string) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include',  // Para enviar cookies (refresh token)
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            setAccessToken(data.accessToken);  // Almacena el access token en el contexto

            return data;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    return { login };
};
