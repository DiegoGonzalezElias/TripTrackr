import { Role, User, UserRepository } from '../domain/user.model.ts';

export function createUserRepository(): UserRepository {
    return {
        getMyRole,
        getNumberOfUsers,
        getCurrentUserName,
        getCurrentUserId,
        getUsers,
        getUserById,
        modifyUserById,
        createNewUser,
        removeUserById,
    };
}

function getMyRole(): Role {

    //TODO: change this fake implementation

    const userRole: Role = Role.Viewer;
    return userRole;
}

function getNumberOfUsers(): Promise<number> {
    //TODO: change this fake implementation
    return Promise.resolve(1);
}

function getCurrentUserName(): string {
    //TODO: change this fake implementation
    return 'defaultUserName';
}

function getCurrentUserId(): string {
    //TODO: change this fake implementation
    return 'defaultUserID';
}

function getUsers(): Promise<User[]> {
    //TODO: change this fake implementation
    return Promise.resolve([] as User[]);
}

function getUserById(id: string): Promise<User> {
    //TODO: change this fake implementation
    console.log(id);
    return Promise.resolve({} as User);
}

function modifyUserById(id: string, data: User): Promise<Request> {
    //TODO: change this fake implementation
    console.log(`${id}&${data.userName}`);
    return Promise.resolve({} as Request);
}

function createNewUser(data: User): Promise<Request> {
    //TODO: change this fake implementation
    console.log(`${data.userName}`);
    return Promise.resolve({} as Request);
}

function removeUserById(id: string): Promise<Request> {
    //TODO: change this fake implementation
    console.log(`${id}`);
    return Promise.resolve({} as Request);
}
