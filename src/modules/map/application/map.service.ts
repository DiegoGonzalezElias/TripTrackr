import { IMarker, MapRepository } from '../domain/map.model.ts';


export const mapService = (mapRepository: MapRepository): MapRepository => ({
    createMap: (token: string, mapName: string) => {
        return mapRepository.createMap(token, mapName);
    },

    addMarker: (token: string, mapName: string, data: IMarker) => {
        return mapRepository.addMarker(token, mapName, data);
    },

    getMarkers: (token: string, mapName: string) => {
        return mapRepository.getMarkers(token, mapName);
    },

});
