import { useAuth } from './useAuth';
import { userService } from '@/modules/user/application/user.service';
import { createUserRepository } from '@/modules/user/infrastucture/user.repository';

export const useDeleteAcc = () => {
    const { accessToken } = useAuth();

    const deleteAcc = async () => {
        try {
            if (accessToken) {
                const userServiceImpl = userService(createUserRepository())
                await userServiceImpl.deleteUserAcc(accessToken);
            } else {
                throw new Error('No access token found')
            }
        } catch (error) {
            console.error('Delete account failed:', error);
            throw error;
        }
    };

    return { deleteAcc };
};