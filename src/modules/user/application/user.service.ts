import { User, UserRepository } from '../domain/user.model.ts';


export const userService = (userRepository: UserRepository): UserRepository => ({
    getMyRole: () => {
        return userRepository.getMyRole();
    },

    getNumberOfUsers: () => {
        return userRepository.getNumberOfUsers();
    },

    getCurrentUserName: () => {
        return userRepository.getCurrentUserName();
    },

    getCurrentUserId: () => {
        return userRepository.getCurrentUserId();
    },

    getUsers: () => {
        return userRepository.getUsers();
    },

    getUserById: (id: string) => {
        return userRepository.getUserById(id);
    },

    modifyUserById: (id: string, data: User) => {
        return userRepository.modifyUserById(id, data);
    },

    createNewUser: (data: User) => {
        return userRepository.createNewUser(data);
    },

    removeUserById: (id: string) => {
        return userRepository.removeUserById(id);
    },

});

