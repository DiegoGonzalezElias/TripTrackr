import { authService } from '@/modules/auth/application/auth.service';
import { useAuth } from './useAuth';
import { createAuthRepository } from '@/modules/auth/infrastructure/auth.repository';

export const useLogout = () => {
    const { setAccessToken } = useAuth();

    const logout = async () => {
        try {
            const authServiceImpl = authService(createAuthRepository())
            await authServiceImpl.logout();
            setAccessToken(null);

        } catch (error) {
            console.error('Logout failed:', error);
            throw error;
        }
    };

    return { logout };
};
