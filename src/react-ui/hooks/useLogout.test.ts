import { act, renderHook } from "@testing-library/react";
import { useLogout } from "./useLogout";
import { authService } from "@/modules/auth/application/auth.service";
import { createAuthRepository } from "@/modules/auth/infrastructure/auth.repository";
import { useAuth } from "./useAuth";

// Mock de dependencias
jest.mock('@/modules/auth/application/auth.service');
jest.mock('@/modules/auth/infrastructure/auth.repository');
jest.mock('./useAuth');

describe('useLogout Hook', () => {
    let mockSetAccessToken: jest.Mock;
    let mockSetUser: jest.Mock;
    let mockLogout: jest.Mock;

    beforeEach(() => {
        mockSetAccessToken = jest.fn();
        mockSetUser = jest.fn();
        mockLogout = jest.fn();

        (authService as jest.Mock).mockReturnValue({
            logout: mockLogout,
        });

        (useAuth as jest.Mock).mockReturnValue({
            setAccessToken: mockSetAccessToken,
            setUser: mockSetUser,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call authService.logout and clear auth state', async () => {
        const { result } = renderHook(() => useLogout());

        await act(async () => {
            await result.current.logout();
        });

        expect(authService).toHaveBeenCalledWith(createAuthRepository());
        expect(mockLogout).toHaveBeenCalledTimes(1);
        expect(mockSetAccessToken).toHaveBeenCalledWith(null);
        expect(mockSetUser).toHaveBeenCalledWith(null);
    });

    it('should handle errors during logout', async () => {
        const error = new Error('Logout failed');
        mockLogout.mockRejectedValueOnce(error);

        const { result } = renderHook(() => useLogout());

        await expect(
            act(async () => {
                await result.current.logout();
            })
        ).rejects.toThrow('Logout failed');

        expect(authService).toHaveBeenCalledWith(createAuthRepository());
        expect(mockLogout).toHaveBeenCalledTimes(1);
        expect(mockSetAccessToken).not.toHaveBeenCalled();
        expect(mockSetUser).not.toHaveBeenCalled();
    });
});