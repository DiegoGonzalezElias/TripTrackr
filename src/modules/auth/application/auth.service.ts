import { AuthRepository, Login, Register } from '../domain/auth.model.ts';


export const authService = (authRepository: AuthRepository): AuthRepository => ({
    getToken: () => {
        return authRepository.getToken();
    },

    loginUser: (data: Login) => {
        return authRepository.loginUser(data);
    },

    registerUser: (data: Register) => {
        return authRepository.registerUser(data);
    },

    logout: () => {
        return authRepository.logout();
    }

    /* refreshTokens: (newRefreshToken: string) => {

        return authRepository.refreshTokens(newRefreshToken);
    }, */


});
