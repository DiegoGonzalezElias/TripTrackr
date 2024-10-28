import { MapRepository } from '../domain/map.model.ts';


export const mapService = (mapRepository: MapRepository): MapRepository => ({
    createMap: (token: string, mapName: string) => {
        return mapRepository.createMap(token, mapName);
    },

});
