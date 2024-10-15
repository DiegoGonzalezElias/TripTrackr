

export interface AuthRepository {
    loginUser: (data: Login) => Promise<Auth>,
    registerUser: (data: Register) => Promise<Auth>,
    getToken: () => Promise<AccessToken>,
    logout: () => Promise<void>
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

export interface Auth {
    accessToken: string,
    user: string
}