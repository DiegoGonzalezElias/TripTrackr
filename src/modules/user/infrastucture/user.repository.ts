import { UserRepository } from '../domain/user.model.ts';

export function createUserRepository(): UserRepository {
    return {
        getUserMaps
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

    const maps = await response.json();

    return maps.maps;
}
