import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { userService } from "@/modules/user/application/user.service";
import { createUserRepository } from "@/modules/user/infrastucture/user.repository";
import { useAuth } from "@/react-ui/hooks/useAuth";
import { mapService } from '@/modules/map/application/map.service';
import { createMapRepository } from '@/modules/map/infrastructure/map.repository';

export function useMapManagement() {
    const { accessToken } = useAuth();
    const [hasMap, setHasMap] = useState(true);

    // Fetching user maps using SWR
    const { data: maps, error, mutate } = useSWR(
        accessToken ? ['userMaps', accessToken] : null,
        async () => {
            if (accessToken) {
                const userServiceImpl = userService(createUserRepository());
                const fetchedMaps = await userServiceImpl.getUserMaps(accessToken);
                return fetchedMaps;
            }

        }
    );

    // Effect to check if user has maps
    useEffect(() => {
        if (maps) {
            setHasMap(maps.length > 0);
        }
    }, [maps]);

    const createMap = async (mapName: string) => {
        if (accessToken) {
            const mapServiceImpl = mapService(createMapRepository());

            console.log('mapName hook: ', mapName)
            await mapServiceImpl.createMap(accessToken, mapName);

            // Revalidate the map list after creating a new map
            mutate();
        }
    };

    return {
        hasMap,
        createMap,
        error
    };
}
