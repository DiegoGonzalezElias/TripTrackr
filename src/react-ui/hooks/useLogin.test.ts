import { act, renderHook } from '@testing-library/react';
import { useLogin } from './useLogin';
import { useAuth } from './useAuth';
import { authService } from '@/modules/auth/application/auth.service';
import validator from 'validator';

jest.mock('./useAuth', () => ({
    useAuth: jest.fn(),
}));

jest.mock('@/modules/auth/application/auth.service', () => ({
    authService: jest.fn(),
}));

jest.mock('validator', () => ({
    isEmail: jest.fn(),
}));

describe('useLogin', () => {
    const mockSetAccessToken = jest.fn();
    const mockSetUser = jest.fn();
    const mockLoginUser = jest.fn();

    beforeEach(() => {
        (useAuth as jest.Mock).mockReturnValue({
            setAccessToken: mockSetAccessToken,
            setUser: mockSetUser,
        });

        (authService as jest.Mock).mockReturnValue({
            loginUser: mockLoginUser,
        });

        jest.clearAllMocks();
    });

    it('should initialize with default state', () => {
        const { result } = renderHook(() => useLogin());

        expect(result.current.username).toBe('');
        expect(result.current.password).toBe('');
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(null);
    });

    it('should set username and password', () => {
        const { result } = renderHook(() => useLogin());

        act(() => {
            result.current.setUsername('test@example.com');
            result.current.setPassword('password123');
        });

        expect(result.current.username).toBe('test@example.com');
        expect(result.current.password).toBe('password123');
    });

    it('should show error if email is invalid', async () => {
        (validator.isEmail as jest.Mock).mockReturnValue(false);

        const { result } = renderHook(() => useLogin());

        await act(async () => {
            await result.current.handleLogin({ preventDefault: jest.fn() } as never);
        });

        expect(result.current.error).toBe('It is not a valid email');
        expect(result.current.loading).toBe(false);
    });

    it('should handle login success', async () => {
        (validator.isEmail as jest.Mock).mockReturnValue(true);
        const mockResponse = {
            accessToken: 'mockToken',
            user: { id: 1, name: 'Test User' },
        };
        mockLoginUser.mockResolvedValue(mockResponse);

        const { result } = renderHook(() => useLogin());

        act(() => {
            result.current.setUsername('test@example.com');
            result.current.setPassword('password123');
        });

        await act(async () => {
            await result.current.handleLogin({ preventDefault: jest.fn() } as never);
        });

        expect(mockSetAccessToken).toHaveBeenCalledWith('mockToken');
        expect(mockSetUser).toHaveBeenCalledWith({ id: 1, name: 'Test User' });
        expect(result.current.error).toBe(null);
        expect(result.current.loading).toBe(false);
    });

    it('should handle login failure', async () => {
        (validator.isEmail as jest.Mock).mockReturnValue(true);
        mockLoginUser.mockRejectedValue(new Error('Invalid credentials'));

        const { result } = renderHook(() => useLogin());

        act(() => {
            result.current.setUsername('test@example.com');
            result.current.setPassword('password123');
        });

        await act(async () => {
            await result.current.handleLogin({ preventDefault: jest.fn() } as never);
        });

        expect(result.current.error).toBe('Invalid email or password');
        expect(result.current.loading).toBe(false);
    });
});
