// LoginForm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from './LoginForm';
import '@testing-library/jest-dom';


jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe('LoginForm', () => {
    it('should renders the login form with inputs and buttons', () => {
        render(<LoginForm switchForm={jest.fn()} />);

        expect(screen.getByText('CARD_TITLE.WELCOME_BUDDY')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('PLACEHOLDERS.ADD_EMAIL')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('PLACEHOLDERS.ADD_PASSWORD')).toBeInTheDocument();
        expect(screen.getByText('BUTTONS.LOGIN')).toBeInTheDocument();
        expect(screen.getByText('BUTTONS.FORGOT_PASSWORD')).toBeInTheDocument();
        expect(screen.getByText('ARE_YOU_NOT_REGISTERED')).toBeInTheDocument();
    });

    it('should updates the email and password when typed into the input fields', () => {
        render(<LoginForm switchForm={jest.fn()} />);

        const emailInput = screen.getByPlaceholderText('PLACEHOLDERS.ADD_EMAIL');
        const passwordInput = screen.getByPlaceholderText('PLACEHOLDERS.ADD_PASSWORD');

        fireEvent.change(emailInput, { target: { value: 'testuser@email.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        expect(emailInput).toHaveValue('testuser@email.com');
        expect(passwordInput).toHaveValue('password123');
    });

    it('should calls the switchForm function when the register link is clicked', () => {
        const mockSwitchForm = jest.fn();
        render(<LoginForm switchForm={mockSwitchForm} />);

        const registerLink = screen.getByText('BUTTONS.REGISTER');

        fireEvent.click(registerLink);

        expect(mockSwitchForm).toHaveBeenCalledWith(false);
    });

    it('should renders forgot password link', () => {
        render(<LoginForm switchForm={jest.fn()} />);

        const forgotPasswordLink = screen.getByText('BUTTONS.FORGOT_PASSWORD');

        expect(forgotPasswordLink).toBeInTheDocument();
    });

    it('should renders the copyright text', () => {
        render(<LoginForm switchForm={jest.fn()} />);

        expect(screen.getByText('©2025 ALL RIGHTS RESERVED')).toBeInTheDocument();
    });
});
