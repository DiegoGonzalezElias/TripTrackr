import { ErrorWithResponse } from '@/lib/types.ts';
import { UserRepository } from '../domain/user.model.ts';

export function createUserRepository(): UserRepository {
    return {
        getUserMaps,
        deleteUserAcc,
    };
}

async function getUserMaps(token: string) {
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}api/user/user-maps`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        const error: ErrorWithResponse = new Error('Error fetching user maps');
        error.response = response;
        throw error;
    }

    const maps = await response.json();

    return maps.maps;
}

async function deleteUserAcc(token: string) {
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}api/user/user-acc`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        const error: ErrorWithResponse = new Error('Error deleting user account');
        error.response = response;
        throw error;
    }

    const maps = await response.json();

    return maps.maps;
}
