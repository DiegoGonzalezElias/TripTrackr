import React from 'react';
import { render, act } from '@testing-library/react';
import { AuthProvider, useAuth } from './useAuth';
import { authService } from '@/modules/auth/application/auth.service';

jest.mock('@/modules/auth/application/auth.service');

describe('AuthProvider and useAuth Hook', () => {
    let mockGetToken: jest.Mock;

    beforeEach(() => {
        mockGetToken = jest.fn();
        (authService as jest.Mock).mockReturnValue({
            getToken: mockGetToken,
        });

        jest.clearAllMocks();
    });

    it('should provide default context values', () => {
        const TestComponent: React.FC = () => {
            const { user, accessToken, isGettingAccessToken } = useAuth();
            return (
                <>
                    <div data-testid="user">{user || 'null'}</div>
                    <div data-testid="accessToken">{accessToken || 'null'}</div>
                    <div data-testid="isGettingAccessToken">{isGettingAccessToken.toString()}</div>
                </>
            );
        };

        const { getByTestId } = render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        expect(getByTestId('user').textContent).toBe('null');
        expect(getByTestId('accessToken').textContent).toBe('null');
        expect(getByTestId('isGettingAccessToken').textContent).toBe('true');
    });

    it('should call getToken on mount and set accessToken', async () => {
        mockGetToken.mockResolvedValue({ accessToken: 'mockAccessToken' });

        const TestComponent: React.FC = () => {
            const { accessToken, isGettingAccessToken } = useAuth();
            return (
                <>
                    <div data-testid="accessToken">{accessToken || 'null'}</div>
                    <div data-testid="isGettingAccessToken">{isGettingAccessToken.toString()}</div>
                </>
            );
        };

        const { getByTestId } = render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        // Wait for useEffect to finish
        await act(async () => { });

        expect(mockGetToken).toHaveBeenCalledTimes(1);
        expect(getByTestId('accessToken').textContent).toBe('mockAccessToken');
        expect(getByTestId('isGettingAccessToken').textContent).toBe('false');
    });

    it('should handle token fetch failure gracefully', async () => {
        mockGetToken.mockRejectedValue(new Error('Token fetch failed'));

        const TestComponent: React.FC = () => {
            const { accessToken, isGettingAccessToken } = useAuth();
            return (
                <>
                    <div data-testid="accessToken">{accessToken || 'null'}</div>
                    <div data-testid="isGettingAccessToken">{isGettingAccessToken.toString()}</div>
                </>
            );
        };

        const { getByTestId } = render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        // Wait for useEffect to finish
        await act(async () => { });

        expect(mockGetToken).toHaveBeenCalledTimes(1);
        expect(getByTestId('accessToken').textContent).toBe('null');
        expect(getByTestId('isGettingAccessToken').textContent).toBe('false');
    });

    it('should allow updating user and accessToken values', () => {
        const TestComponent: React.FC = () => {
            const { setUser, setAccessToken, user, accessToken } = useAuth();

            return (
                <>
                    <button
                        data-testid="setUser"
                        onClick={() => setUser('testUser')}
                    >
                        Set User
                    </button>
                    <button
                        data-testid="setAccessToken"
                        onClick={() => setAccessToken('newAccessToken')}
                    >
                        Set AccessToken
                    </button>
                    <div data-testid="user">{user || 'null'}</div>
                    <div data-testid="accessToken">{accessToken || 'null'}</div>
                </>
            );
        };

        const { getByTestId } = render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        act(() => {
            getByTestId('setUser').click();
        });
        expect(getByTestId('user').textContent).toBe('testUser');

        act(() => {
            getByTestId('setAccessToken').click();
        });
        expect(getByTestId('accessToken').textContent).toBe('newAccessToken');
    });

    it('should throw error if useAuth is used outside AuthProvider', () => {
        const TestComponent: React.FC = () => {
            useAuth();
            return null;
        };

        expect(() => render(<TestComponent />)).toThrowError(
            'useAuth must be used within an AuthProvider'
        );
    });
});
