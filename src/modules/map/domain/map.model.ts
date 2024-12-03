export interface IMarker {
    latitude: string;
    longitude: string;
    name: string;
    description?: string;
    category: 'restaurant' | 'hosting' | 'attraction' | 'shopping' | 'transport' | 'other';
    date?: string;
}

export interface MapRepository {
    createMap: (token: string, mapName: string) => Promise<Response>,
    deleteMap: (token: string, mapName: string) => Promise<Response>,
    selectMap: (token: string, mapName: string) => Promise<Response>,
    addMarker: (token: string, mapName: string, data: IMarker) => Promise<Response>,
    getMarkers: (token: string, mapName: string) => Promise<IMarker[]>,
    getEditors: (token: string) => Promise<string[]>,
}

export interface MarkerData {
    position: L.LatLng;
    text: string;
    description?: string,
    category: string,
    date?: string
}

