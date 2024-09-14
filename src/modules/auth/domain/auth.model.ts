import { User } from '../../user/domain/user.model.ts';

export interface AuthRepository {
    loginUser: (data: Login) => Promise<Request>,
    createFirstUser: (data: User) => Promise<Request>,
    getToken: () => string | null,
    refreshTokens: (newRefreshToken: string) => Promise<Request>,
}

export interface Login {
    userId: string,
    password: string
}

export interface Auth {
    userName: string,
    authToken: string,
    refreshToken: string,
}