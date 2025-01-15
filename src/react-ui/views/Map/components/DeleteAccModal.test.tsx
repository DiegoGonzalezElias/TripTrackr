import { render, screen, fireEvent } from '@testing-library/react';
import DeleteAccModal from './DeleteAccModal';
import '@testing-library/jest-dom';
import { AuthProvider } from '@/react-ui/hooks/useAuth';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe('DeleteAccModal Component', () => {
    test('renders delete account input and label', () => {
        render(
            <AuthProvider>
                <DeleteAccModal />
            </AuthProvider>
        );

        // Verifica que el label y el input para la acción de eliminar cuenta se muestren
        const deleteAccLabel = screen.getByText('LABELS.DELETE_ACC');
        expect(deleteAccLabel).toBeInTheDocument();

        const deleteAccInput = screen.getByPlaceholderText('PLACEHOLDERS.DELETE_ACC');
        expect(deleteAccInput).toBeInTheDocument();
        expect(deleteAccInput).toHaveAttribute('type', 'password');
    });

    test('updates delete word state on input change', () => {
        render(
            <AuthProvider>
                <DeleteAccModal />
            </AuthProvider>
        );

        const deleteAccInput = screen.getByPlaceholderText('PLACEHOLDERS.DELETE_ACC');

        // Simula el ingreso de texto en el campo de eliminación
        fireEvent.change(deleteAccInput, { target: { value: 'DELETE' } });
        expect(deleteAccInput).toHaveValue('DELETE');
    });

    test('renders delete button', () => {
        render(
            <AuthProvider>
                <DeleteAccModal />
            </AuthProvider>
        );

        // Verifica que el botón de eliminar cuenta se muestre
        const deleteButton = screen.getByRole('button', { name: 'BUTTONS.DELETE' });
        expect(deleteButton).toBeInTheDocument();
        expect(deleteButton).toHaveTextContent('BUTTONS.DELETE');
    });
});
