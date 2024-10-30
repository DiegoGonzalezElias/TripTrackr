import { render, screen, fireEvent } from '@testing-library/react';
import EditersModal from './EditersModal';
import '@testing-library/jest-dom';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe('EditersModal Component', () => {
    const mockEmails = ['editor1@example.com', 'editor2@example.com'];

    test('renders label and input for adding a new editor', () => {
        render(<EditersModal emails={mockEmails} />);

        // Verifica que el label y el input para agregar editor se muestren
        const addEditorLabel = screen.getByText('LABELS.ADD_EDITOR');
        expect(addEditorLabel).toBeInTheDocument();

        const addEditorInput = screen.getByPlaceholderText('PLACEHOLDERS.ADD_EMAIL');
        expect(addEditorInput).toBeInTheDocument();
        expect(addEditorInput).toHaveAttribute('type', 'text');
    });

    test('updates new editor state on input change', () => {
        render(<EditersModal emails={mockEmails} />);

        const addEditorInput = screen.getByPlaceholderText('PLACEHOLDERS.ADD_EMAIL');

        // Simula la entrada de texto en el campo de nuevo editor
        fireEvent.change(addEditorInput, { target: { value: 'new_editor@example.com' } });
        expect(addEditorInput).toHaveValue('new_editor@example.com');
    });

    test('renders list of existing editor emails', () => {
        render(<EditersModal emails={mockEmails} />);

        // Verifica que se muestren los correos electrónicos proporcionados
        mockEmails.forEach(email => {
            const emailElement = screen.getByText(email);
            expect(emailElement).toBeInTheDocument();
        });
    });

    test('renders apply button', () => {
        render(<EditersModal emails={mockEmails} />);

        // Verifica que el botón de aplicar se muestre y tenga el estilo adecuado
        const applyButton = screen.getByRole('button', { name: 'BUTTONS.APPLY' });
        expect(applyButton).toBeInTheDocument();
        expect(applyButton).toHaveTextContent('BUTTONS.APPLY');
    });
});
