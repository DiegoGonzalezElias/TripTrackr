

export interface AuthRepository {
    loginUser: (data: Login) => Promise<AccessToken>,
    registerUser: (data: Register) => Promise<AccessToken>,
    getToken: () => Promise<AccessToken>,
    //refreshTokens: (newRefreshToken: string) => Promise<Request>,
}

export interface Login {
    email: string,
    password: string
}

export interface Register {
    email: string,
    password: string,
    confirmPassword: string
}

export interface AccessToken {
    accessToken: string
}