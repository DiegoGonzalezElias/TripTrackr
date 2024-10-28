export interface MapRepository {
    createMap: (token: string, mapName: string) => Promise<Response>,
}
