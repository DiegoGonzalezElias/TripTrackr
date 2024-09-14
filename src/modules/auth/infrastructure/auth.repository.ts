import { User } from '../../user/domain/user.model.ts';
import { AuthRepository, Login } from '../domain/auth.model.ts';

export function createAuthRepository(): AuthRepository {
    return {
        getToken,
        loginUser,
        createFirstUser,
        refreshTokens,
    };
}

function getToken(): string | null {

    //TODO: change this fake implementation

    const userToken: string | null = null;
    return userToken;

}

function loginUser(data: Login): Promise<Request> {
    //TODO: change this fake implementation
    console.log(data);
    return Promise.resolve({} as Request);
}

function createFirstUser(data: User): Promise<Request> {
    //TODO: change this fake implementation
    console.log(data);
    return Promise.resolve({} as Request);
}

function refreshTokens(newRefreshToken: string): Promise<Request> {
    //TODO: change this fake implementation
    console.log(newRefreshToken);
    return Promise.resolve({} as Request);
}