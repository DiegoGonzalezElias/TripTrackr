import { useState, useEffect } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { userService } from "@/modules/user/application/user.service";
import { createUserRepository } from "@/modules/user/infrastucture/user.repository";
import { useAuth } from "@/react-ui/hooks/useAuth";
import { mapService } from '@/modules/map/application/map.service';
import { createMapRepository } from '@/modules/map/infrastructure/map.repository';
import { IMarker } from '@/modules/map/domain/map.model';
import { authService } from '@/modules/auth/application/auth.service';
import { createAuthRepository } from '@/modules/auth/infrastructure/auth.repository';

export function useMapManagement() {
    const { accessToken, setAccessToken } = useAuth();
    const [hasMap, setHasMap] = useState(true);

    // Fetching user maps using SWR
    const { data: maps, error, mutate: mutateMaps } = useSWR(
        accessToken ? ['userMaps', accessToken] : null,
        async () => {
            if (accessToken) {
                const userServiceImpl = userService(createUserRepository());
                const fetchedMaps = await userServiceImpl.getUserMaps(accessToken);
                return fetchedMaps;
            }

        },
        {
            onErrorRetry: async (error, key, config, revalidate, { retryCount }) => {
                if (error.response?.status === 403) {
                    // Intentar renovar el token
                    const authServiceImpl = authService(createAuthRepository());
                    const newToken = await authServiceImpl.getToken();
                    if (newToken.accessToken) {
                        setAccessToken(newToken.accessToken);
                        revalidate({ retryCount: retryCount + 1 });
                    }
                }
            },
        }
    );

    const { data: markers, error: markerError, mutate: mutateMarkers } = useSWR(
        accessToken ? ['markers', accessToken] : null,
        async () => {
            if (accessToken && maps) {
                const mapServiceImpl = mapService(createMapRepository());
                const fetchedMarkers = await mapServiceImpl.getMarkers(accessToken, maps[0]);
                return fetchedMarkers;
            }

        },
        {
            onErrorRetry: async (error, key, config, revalidate, { retryCount }) => {
                if (error.response?.status === 403) {
                    // Intentar renovar el token
                    const authServiceImpl = authService(createAuthRepository());
                    const newToken = await authServiceImpl.getToken();
                    if (newToken.accessToken) {
                        setAccessToken(newToken.accessToken);
                        revalidate({ retryCount: retryCount + 1 });
                    }
                }
            },
        }
    );

    useEffect(() => {
        if (maps && accessToken) {
            mutateMarkers();
        }
        if (maps) {
            setHasMap(maps.length > 0);
        }
    }, [maps, accessToken, mutateMarkers]);

    /*  // Effect to check if user has maps
     useEffect(() => {
         if (maps) {
             setHasMap(maps.length > 0);
         }
     }, [maps]); */

    const createMap = async (mapName: string) => {
        if (accessToken) {
            const mapServiceImpl = mapService(createMapRepository());

            await mapServiceImpl.createMap(accessToken, mapName);

            // Revalidate the map list after creating a new map
            mutateMaps();
        }
    };


    const [deleteMapName, setDeleteMapName] = useState<string | null>(null);

    const { trigger: triggerDeleteMap, isMutating: isDeleteMapLoading, error: deleteMapError } = useSWRMutation(
        ['deleteMap', accessToken],
        async (key, { arg: mapName }: { arg: string }) => {
            if (!accessToken) return;

            setDeleteMapName(mapName);

            const mapServiceImpl = mapService(createMapRepository());

            await mapServiceImpl.deleteMap(accessToken, mapName);
            mutateMaps(); // Recarga la lista de mapas después de eliminar uno
        },
        {
            onError: async (error) => {
                console.error('Error occurred:', error);

                if (error.response?.status === 403) {
                    // Attempt token renewal
                    const authServiceImpl = authService(createAuthRepository());
                    const newToken = await authServiceImpl.getToken();

                    if (newToken.accessToken) {
                        setAccessToken(newToken.accessToken);

                        // Reintenta la eliminación del mapa con el nuevo token
                        const mapServiceImpl = mapService(createMapRepository());
                        await mapServiceImpl.deleteMap(newToken.accessToken, deleteMapName!);
                        mutateMaps();
                    } else {
                        throw new Error("Token renewal failed");
                    }
                } else {
                    throw error;
                }
            },
        }
    );


    const [selectedMapName, setSelectedMapName] = useState<string | null>(null);

    const { trigger: triggerSelectMap, isMutating: isSelectMapLoading, error: selectMapError } = useSWRMutation(
        ['selectMap', accessToken],
        async (key, { arg: mapName }: { arg: string }) => {
            if (!accessToken) return;

            setSelectedMapName(mapName);

            const mapServiceImpl = mapService(createMapRepository());

            await mapServiceImpl.selectMap(accessToken, mapName);
            mutateMaps(); // Recarga la lista de mapas después de seleccionar uno
        },
        {
            onError: async (error) => {
                console.error('Error occurred:', error);

                if (error.response?.status === 403) {
                    // Attempt token renewal
                    const authServiceImpl = authService(createAuthRepository());
                    const newToken = await authServiceImpl.getToken();

                    if (newToken.accessToken) {
                        setAccessToken(newToken.accessToken);

                        // Reintenta la seleccion del mapa con el nuevo token
                        const mapServiceImpl = mapService(createMapRepository());
                        await mapServiceImpl.selectMap(newToken.accessToken, selectedMapName!);
                        mutateMaps();
                    } else {
                        throw new Error("Token renewal failed");
                    }
                } else {
                    throw error;
                }
            },
        }
    );




    const addMarker = async (mapName: string, data: IMarker) => {
        if (accessToken) {
            const mapServiceImpl = mapService(createMapRepository());

            await mapServiceImpl.addMarker(accessToken, mapName, data);

            mutateMarkers();
        }
    };

    return {
        maps,
        hasMap,
        createMap,
        addMarker,
        error,
        markers,
        markerError,
        triggerDeleteMap,
        deleteMapError,
        isDeleteMapLoading,
        triggerSelectMap,
        isSelectMapLoading,
        selectMapError
    };
}
