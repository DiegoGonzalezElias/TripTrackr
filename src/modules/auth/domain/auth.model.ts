import { User } from '../../user/domain/user.model.ts';

export interface AuthRepository {
    loginUser: (data: Login) => Promise<AccessToken>,
    registerUser: (data: User) => Promise<Request>,
    getToken: () => Promise<AccessToken>,
    refreshTokens: (newRefreshToken: string) => Promise<Request>,
}

export interface Login {
    email: string,
    password: string
}

export interface AccessToken {
    accessToken: string
}