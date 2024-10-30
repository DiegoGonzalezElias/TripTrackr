import { fireEvent, render, screen, } from '@testing-library/react';
import AccountModal from './AccountModal';
import '@testing-library/jest-dom';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));


describe('AccountModal Component', () => {
    test('renders old password input and label', () => {
        render(<AccountModal />);

        // Verifica que el label y el input para la contraseña anterior se muestren
        const oldPassLabel = screen.getByText('LABELS.OLD_PASS');
        expect(oldPassLabel).toBeInTheDocument();

        const oldPassInput = screen.getByPlaceholderText('PLACEHOLDERS.OLD_PASS');
        expect(oldPassInput).toBeInTheDocument();
        expect(oldPassInput).toHaveAttribute('type', 'password');
    });

    test('renders new password input and label', () => {
        render(<AccountModal />);

        // Verifica que el label y el input para la nueva contraseña se muestren
        const newPassLabel = screen.getByText('LABELS.NEW_PASS');
        expect(newPassLabel).toBeInTheDocument();

        const newPassInput = screen.getByPlaceholderText('PLACEHOLDERS.NEW_PASS');
        expect(newPassInput).toBeInTheDocument();
        expect(newPassInput).toHaveAttribute('type', 'password');
    });

    test('updates old password state on input change', () => {
        render(<AccountModal />);

        const oldPassInput = screen.getByPlaceholderText('PLACEHOLDERS.OLD_PASS');

        // Simula el ingreso de texto en el campo de contraseña anterior
        fireEvent.change(oldPassInput, { target: { value: 'old_password123' } });
        expect(oldPassInput).toHaveValue('old_password123');
    });

    test('updates new password state on input change', () => {
        render(<AccountModal />);

        const newPassInput = screen.getByPlaceholderText('PLACEHOLDERS.NEW_PASS');

        // Simula el ingreso de texto en el campo de nueva contraseña
        fireEvent.change(newPassInput, { target: { value: 'new_password123' } });
        expect(newPassInput).toHaveValue('new_password123');
    });

    test('renders change password button', () => {
        render(<AccountModal />);

        // Verifica que el botón de cambiar contraseña se muestre
        const changePasswordButton = screen.getByRole('button', { name: 'BUTTONS.CHANGE_PASSWORD' });
        expect(changePasswordButton).toBeInTheDocument();
        expect(changePasswordButton).toHaveTextContent('BUTTONS.CHANGE_PASSWORD');
    });
});
