import { renderHook, act } from '@testing-library/react';
import { useRegister } from './useRegister';
import { authService } from '@/modules/auth/application/auth.service';
import { useAuth } from './useAuth';
import validator from 'validator';

jest.mock('@/modules/auth/application/auth.service');
jest.mock('./useAuth');
jest.mock('validator');

describe('useRegister Hook', () => {
    let mockSetAccessToken: jest.Mock;
    let mockSetUser: jest.Mock;
    let mockRegisterUser: jest.Mock;

    beforeEach(() => {
        mockSetAccessToken = jest.fn();
        mockSetUser = jest.fn();
        mockRegisterUser = jest.fn();

        (useAuth as jest.Mock).mockReturnValue({
            setAccessToken: mockSetAccessToken,
            setUser: mockSetUser,
        });

        (authService as jest.Mock).mockReturnValue({
            registerUser: mockRegisterUser,
        });

        jest.clearAllMocks();
    });

    it('should initialize state correctly', () => {
        const { result } = renderHook(() => useRegister());

        expect(result.current.username).toBe('');
        expect(result.current.password).toBe('');
        expect(result.current.confirmPassword).toBe('');
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it('should update username state when setUsername is called', () => {
        const { result } = renderHook(() => useRegister());

        act(() => {
            result.current.setUsername('test@example.com');
        });

        expect(result.current.username).toBe('test@example.com');
    });

    it('should update password state when setPassword is called', () => {
        const { result } = renderHook(() => useRegister());

        act(() => {
            result.current.setPassword('password123');
        });

        expect(result.current.password).toBe('password123');
    });

    it('should update confirmPassword state when setConfirmPassword is called', () => {
        const { result } = renderHook(() => useRegister());

        act(() => {
            result.current.setConfirmPassword('password123');
        });

        expect(result.current.confirmPassword).toBe('password123');
    });

    it('should show error if email is invalid', async () => {
        (validator.isEmail as jest.Mock).mockReturnValue(false);

        const { result } = renderHook(() => useRegister());

        await act(async () => {
            await result.current.handleRegister({ preventDefault: jest.fn() } as never);
        });

        expect(result.current.error).toBe('It is not a valid email');
        expect(result.current.loading).toBe(false);
    });

    it('should show error if passwords do not match', async () => {
        (validator.isEmail as jest.Mock).mockReturnValue(true);

        const { result } = renderHook(() => useRegister());

        act(() => {
            result.current.setPassword('password123');
            result.current.setConfirmPassword('password456');
        });

        await act(async () => {
            await result.current.handleRegister({ preventDefault: jest.fn() } as never);
        });

        expect(result.current.error).toBe('Passwords are not equal');
        expect(result.current.loading).toBe(false);
    });

    it('should register successfully with valid credentials', async () => {
        (validator.isEmail as jest.Mock).mockReturnValue(true);
        mockRegisterUser.mockResolvedValue({
            accessToken: 'mockAccessToken',
            user: { id: 1, name: 'Test User' },
        });

        const { result } = renderHook(() => useRegister());

        act(() => {
            result.current.setUsername('test@example.com');
            result.current.setPassword('password123');
            result.current.setConfirmPassword('password123');
        });

        await act(async () => {
            await result.current.handleRegister({ preventDefault: jest.fn() } as never);
        });

        expect(mockRegisterUser).toHaveBeenCalledWith({
            email: 'test@example.com',
            password: 'password123',
            confirmPassword: 'password123',
        });
        expect(mockSetAccessToken).toHaveBeenCalledWith('mockAccessToken');
        expect(mockSetUser).toHaveBeenCalledWith({ id: 1, name: 'Test User' });
        expect(result.current.error).toBeNull();
        expect(result.current.loading).toBe(false);
    });

    it('should show error on registration failure', async () => {
        (validator.isEmail as jest.Mock).mockReturnValue(true);
        mockRegisterUser.mockRejectedValue(new Error('Registration failed'));

        const { result } = renderHook(() => useRegister());

        act(() => {
            result.current.setUsername('test@example.com');
            result.current.setPassword('password123');
            result.current.setConfirmPassword('password123');
        });

        await act(async () => {
            await result.current.handleRegister({ preventDefault: jest.fn() } as never);
        });

        expect(result.current.error).toBe('Invalid email or password');
        expect(result.current.loading).toBe(false);
    });
});
