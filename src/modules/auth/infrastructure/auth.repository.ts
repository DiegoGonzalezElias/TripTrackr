import { AccessToken, AuthRepository, Login, Register } from '../domain/auth.model.ts';

export function createAuthRepository(): AuthRepository {
    return {
        getToken,
        loginUser,
        registerUser,
        //refreshTokens,
    };
}

async function getToken(): Promise<AccessToken> {
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}api/auth/refresh-token`, {
        method: 'POST',
        credentials: 'include'
    });

    const data = await response.json() as AccessToken;

    return data;

}

async function loginUser(data: Login): Promise<AccessToken> {
    const { email, password } = data
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    const JSONdata = await response.json() as AccessToken;

    return JSONdata;
}

async function registerUser(data: Register): Promise<AccessToken> {
    const { email, password, confirmPassword } = data
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}api/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, confirmPassword }),
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Registration failed');
    }

    const JSONdata = await response.json() as AccessToken;

    return JSONdata;
}
/* 
function refreshTokens(newRefreshToken: string): Promise<Request> {
    //TODO: change this fake implementation
    console.log(newRefreshToken);
    return Promise.resolve({} as Request);
} */