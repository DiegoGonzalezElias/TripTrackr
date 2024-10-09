// RegisterForm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegisterForm from './RegisterForm';


jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe('RegisterForm', () => {
    it('should renders the register form with inputs and buttons', () => {
        render(<RegisterForm switchForm={jest.fn()} />);

        expect(screen.getByText('CARD_TITLE.WELCOME_BUDDY')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('PLACEHOLDERS.ADD_EMAIL')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('PLACEHOLDERS.ADD_PASSWORD')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('PLACEHOLDERS.REPIT_PASSWORD')).toBeInTheDocument();
        expect(screen.getByText('BUTTONS.REGISTER')).toBeInTheDocument();
        expect(screen.getByText('ARE_YOU_REGISTERED')).toBeInTheDocument();
    });

    it('should updates the email, password and repit password when typed into the input fields', () => {
        render(<RegisterForm switchForm={jest.fn()} />);

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
        render(<RegisterForm switchForm={mockSwitchForm} />);

        const loginLink = screen.getByText('BUTTONS.LOGIN');

        fireEvent.click(loginLink);

        expect(mockSwitchForm).toHaveBeenCalledWith(true);
    });

    it('should renders the copyright text', () => {
        render(<RegisterForm switchForm={jest.fn()} />);

        expect(screen.getByText('©2025 ALL RIGHTS RESERVED')).toBeInTheDocument();
    });
});
