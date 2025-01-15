import { UserRepository } from '../domain/user.model.ts';


export const userService = (userRepository: UserRepository): UserRepository => ({
    getUserMaps: (token: string) => {
        return userRepository.getUserMaps(token);
    },

    deleteUserAcc: (token: string) => {
        return userRepository.deleteUserAcc(token);
    },
});

