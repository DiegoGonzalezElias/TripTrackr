import { authService } from "@/modules/auth/application/auth.service";
import { createAuthRepository } from "@/modules/auth/infrastructure/auth.repository";
import { PublicConfiguration, Revalidator } from "swr/_internal";


interface SWRError extends Error {
    response?: {
        status: number;
    };
}

export const createSWRConfig = (setAccessToken: (token: string | null) => void) =>
    async (
        error: Error,
        key: string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        config: Readonly<PublicConfiguration<any, any, any>>,
        revalidate: Revalidator,
        { retryCount }: { retryCount: number }
    ): Promise<void> => {
        if (retryCount >= 3) return;

        if ('response' in error && (error as SWRError).response?.status === 403) {
            try {
                const authServiceImpl = authService(createAuthRepository());
                const newToken = await authServiceImpl.getToken();

                if (newToken.accessToken) {
                    setAccessToken(newToken.accessToken);
                    revalidate({ retryCount: retryCount + 1 });
                }
            } catch (refreshError) {
                console.error("Error renewing token", refreshError);
            }
        }
    };