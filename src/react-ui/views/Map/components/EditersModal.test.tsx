import { render, screen, fireEvent } from '@testing-library/react';
import EditersModal from './EditersModal';
import '@testing-library/jest-dom';
import { useEditors } from '@/react-ui/hooks/useEditors';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

jest.mock('@/react-ui/hooks/userMapManagement', () => ({
    useMapManagement: jest.fn(),
}));

jest.mock('@/react-ui/hooks/useEditors', () => ({
    useEditors: jest.fn(),
}));

describe('EditersModal Component', () => {
    const mockEmails = ['editor1@example.com', 'editor2@example.com'];

    beforeEach(() => {
        (useEditors as jest.Mock).mockReturnValue({
            editors: mockEmails,
            editorsError: false,
            editorsLoading: false
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders label and input for adding a new editor', () => {
        render(<EditersModal />);

        const addEditorLabel = screen.getByText('LABELS.ADD_EDITOR');
        expect(addEditorLabel).toBeInTheDocument();

        const addEditorInput = screen.getByPlaceholderText('PLACEHOLDERS.ADD_EMAIL');
        expect(addEditorInput).toBeInTheDocument();
        expect(addEditorInput).toHaveAttribute('type', 'text');
    });

    test('updates new editor state on input change', () => {
        render(<EditersModal />);

        const addEditorInput = screen.getByPlaceholderText('PLACEHOLDERS.ADD_EMAIL');

        fireEvent.change(addEditorInput, { target: { value: 'new_editor@example.com' } });
        expect(addEditorInput).toHaveValue('new_editor@example.com');
    });

    test('renders list of existing editor emails', () => {
        render(<EditersModal />);

        mockEmails.forEach(email => {
            const emailElement = screen.getByText(email);
            expect(emailElement).toBeInTheDocument();
        });
    });

    test('renders apply button', () => {
        render(<EditersModal />);

        const applyButton = screen.getByRole('button', { name: 'BUTTONS.APPLY' });
        expect(applyButton).toBeInTheDocument();
        expect(applyButton).toHaveTextContent('BUTTONS.APPLY');
    });
});
