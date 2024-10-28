import { MapRepository } from '../domain/map.model.ts';

export function createMapRepository(): MapRepository {
    return {
        createMap
    };
}

async function createMap(token: string, mapName: string) {
    console.log('mapName: ', mapName);

    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}api/map/create-map`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,  // Aquí se pasa el token en la cabecera Authorization
        },
        body: JSON.stringify({ mapName }),
    });

    const data = await response.json();

    console.log('crated map: ', data)

    return data;
}
