import { ErrorWithResponse } from '@/lib/types.ts';
import { IMarker, MapRepository } from '../domain/map.model.ts';

export function createMapRepository(): MapRepository {
    return {
        createMap,
        deleteMap,
        addMarker,
        getMarkers,
        selectMap
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

    if (!response.ok) {
        const error: ErrorWithResponse = {
            name: 'Error creating map',
            message: 'Error creating map',
            response: { status: 403 }
        };
        throw error;
    }

    const data = await response.json();

    return data;
}

async function deleteMap(token: string, mapName: string) {

    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}api/map/delete-map`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,  // Aquí se pasa el token en la cabecera Authorization
        },
        body: JSON.stringify({ mapName }),
    });

    console.log('deleteMap response: ', response);

    if (!response.ok) {
        console.log('error en la peticion a delete map')
        const error: ErrorWithResponse = {
            name: "Error deleting map",
            message: 'Error deleting map',
            response: { status: 403 }
        };
        throw error;
    }

    const data = await response.json();

    console.log('deletemap data: ', data)

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

    if (!response.ok) {
        const error: ErrorWithResponse = {
            name: "Error adding marker",
            message: "Error adding marker",
            response: { status: 403 }
        };
        throw error;
    }

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
        const error: ErrorWithResponse = {
            name: 'Error fetching user maps',
            message: 'Error fetching user maps',
            response: { status: 403 }
        };
        throw error;
    }

    const result = await response.json();

    return result.data;
}

async function selectMap(token: string, mapName: string) {

    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}api/map/select-map`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,  // Aquí se pasa el token en la cabecera Authorization
        },
        body: JSON.stringify({ mapName }),
    });

    console.log('selectMap response: ', response);

    if (!response.ok) {
        const error: ErrorWithResponse = {
            name: "Error selecting map",
            message: 'Error selecting map',
            response: { status: 403 }
        };
        throw error;
    }

    const data = await response.json();

    console.log('selectMap data: ', data)

    return data;
}
