import { User } from '../../user/domain/user.model.ts';
import { AuthRepository, Login } from '../domain/auth.model.ts';


export const authService = (authRepository: AuthRepository): AuthRepository => ({
    getToken: () => {
        return authRepository.getToken();
    },

    loginUser: (data: Login) => {
        return authRepository.loginUser(data);
    },

    registerUser: (data: User) => {

        return authRepository.registerUser(data);
    },

    refreshTokens: (newRefreshToken: string) => {

        return authRepository.refreshTokens(newRefreshToken);
    },


});
