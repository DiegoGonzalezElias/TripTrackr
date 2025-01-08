import { authService } from "@/modules/auth/application/auth.service";
import { createAuthRepository } from "@/modules/auth/infrastructure/auth.repository";
import { mapService } from "@/modules/map/application/map.service";
import { createMapRepository } from "@/modules/map/infrastructure/map.repository";
import useSWR from "swr";
import { useAuth } from "./useAuth";

export function useEditors() {
    const { accessToken, setAccessToken } = useAuth();

    const { data: editors, error: editorsError, isLoading: editorsLoading, mutate: mutateEditors } = useSWR(
        accessToken ? ['editors', accessToken] : null,
        async () => {
            if (accessToken) {
                const mapServiceImpl = mapService(createMapRepository());
                const fetchedEditors = await mapServiceImpl.getEditors(accessToken);
                return fetchedEditors;
            }

        },
        {
            onErrorRetry: async (error, _key, _config, revalidate, { retryCount }) => {
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

    return {
        editors,
        editorsError,
        editorsLoading,
        mutateEditors
    }
}