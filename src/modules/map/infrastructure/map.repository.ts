import { IMarker, MapRepository } from '../domain/map.model.ts';

export function createMapRepository(): MapRepository {
    return {
        createMap,
        addMarker,
        getMarkers
    };
}

async function createMap(token: string, mapName: string) {

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

    return data;
}

async function addMarker(token: string, mapName: string, data: IMarker) {

    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}api/map/update-map`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ mapName, data }),
    });

    const result = await response.json();

    return result;
}

async function getMarkers(token: string, mapName: string) {

    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}api/map/get-all-markers?mapName=${mapName}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const error = {
            message: 'Error fetching user maps',
            status: 403
        };
        throw error;
    }

    const result = await response.json();

    return result.data;
}
