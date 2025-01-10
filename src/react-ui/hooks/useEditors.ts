import { authService } from "@/modules/auth/application/auth.service";
import { createAuthRepository } from "@/modules/auth/infrastructure/auth.repository";
import { mapService } from "@/modules/map/application/map.service";
import { createMapRepository } from "@/modules/map/infrastructure/map.repository";
import useSWR from "swr";
import { useAuth } from "./useAuth";
import { useState } from "react";
import useSWRMutation from "swr/mutation";

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

    const [modifiedEditor, setModifiedEditor] = useState<string | null>(null);
    const [action, setAction] = useState<'add' | 'remove' | null>(null);

    const { trigger: triggerModifyEditors, isMutating: isModifyEditorsLoading, error: modifyEditorsError } = useSWRMutation(
        ['deleteMap', accessToken],
        async (_key, { arg }: { arg: { editorEmail: string; action: 'add' | 'remove' } }) => {
            if (!accessToken) return;

            const { editorEmail, action } = arg;

            setModifiedEditor(editorEmail);
            setAction(action);

            const mapServiceImpl = mapService(createMapRepository());

            await mapServiceImpl.modifyEditors(accessToken, action, editorEmail);
            mutateEditors();
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

                        const mapServiceImpl = mapService(createMapRepository());
                        await mapServiceImpl.modifyEditors(newToken.accessToken, action!, modifiedEditor!);
                        mutateEditors();
                    } else {
                        throw new Error("Token renewal failed");
                    }
                } else {
                    throw error;
                }
            },
        }
    );

    return {
        editors,
        editorsError,
        editorsLoading,
        mutateEditors,
        triggerModifyEditors,
        isModifyEditorsLoading,
        modifyEditorsError,
    }
}