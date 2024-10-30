// RegisterForm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegisterForm from './RegisterForm';
import { AuthProvider } from '@/react-ui/hooks/useAuth';


jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

jest.mock('@/react-ui/hooks/useAuth', () => {
    return {
        AuthProvider: ({ children }: React.PropsWithChildren<object>) => <div>{children}</div>,
        useAuth: () => ({
            user: { name: 'Test User' },
        }),
    };
});

describe('RegisterForm', () => {
    it('should renders the register form with inputs and buttons', () => {
        render(
            <AuthProvider>
                <RegisterForm switchForm={jest.fn()} />
            </AuthProvider>
        );

        expect(screen.getByText('CARD_TITLE.WELCOME_BUDDY')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('PLACEHOLDERS.ADD_EMAIL')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('PLACEHOLDERS.ADD_PASSWORD')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('PLACEHOLDERS.REPIT_PASSWORD')).toBeInTheDocument();
        expect(screen.getByText('BUTTONS.REGISTER')).toBeInTheDocument();
        expect(screen.getByText('ARE_YOU_REGISTERED')).toBeInTheDocument();
    });

    it('should updates the email, password and repit password when typed into the input fields', () => {
        render(
            <AuthProvider>
                <RegisterForm switchForm={jest.fn()} />
            </AuthProvider>
        );

        const emailInput = screen.getByPlaceholderText('PLACEHOLDERS.ADD_EMAIL');
        const passwordInput = screen.getByPlaceholderText('PLACEHOLDERS.ADD_PASSWORD');
        const repitPasswordInput = screen.getByPlaceholderText('PLACEHOLDERS.REPIT_PASSWORD');

        fireEvent.change(emailInput, { target: { value: 'testuser@email.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.change(repitPasswordInput, { target: { value: 'password123' } });

        expect(emailInput).toHaveValue('testuser@email.com');
        expect(passwordInput).toHaveValue('password123');
        expect(repitPasswordInput).toHaveValue('password123');
    });

    it('should calls the switchForm function when the login link is clicked', () => {
        const mockSwitchForm = jest.fn();
        render(
            <AuthProvider>
                <RegisterForm switchForm={mockSwitchForm} />
            </AuthProvider>
        );

        const loginLink = screen.getByText('BUTTONS.LOGIN');

        fireEvent.click(loginLink);

        expect(mockSwitchForm).toHaveBeenCalledWith(true);
    });

    it('should renders the copyright text', () => {
        render(
            <AuthProvider>
                <RegisterForm switchForm={jest.fn()} />
            </AuthProvider>
        );

        expect(screen.getByText('©2025 ALL RIGHTS RESERVED')).toBeInTheDocument();
    });
});
