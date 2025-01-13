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
            editorsLoading: false,
            triggerModifyEditors: jest.fn(),
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

    test('renders and press - add button', () => {
        render(<EditersModal />);

        const applyButton = screen.getByRole('button', { name: 'BUTTONS.ADD' });
        fireEvent.click(applyButton);
        expect(applyButton).toBeInTheDocument();
        expect(applyButton).toHaveTextContent('BUTTONS.ADD');
    });

    test('renders loading state', () => {
        (useEditors as jest.Mock).mockReturnValue({
            editors: [],
            editorsError: false,
            editorsLoading: true,
            triggerModifyEditors: jest.fn(),
        });

        render(<EditersModal />);

        const loadingText = screen.getByText('Loading...');
        expect(loadingText).toBeInTheDocument();
    })

    test('renders error state', () => {
        (useEditors as jest.Mock).mockReturnValue({
            editors: [],
            editorsError: true,
            editorsLoading: false,
            triggerModifyEditors: jest.fn(),
        });

        render(<EditersModal />);

        const errorText = screen.getByText('Ups...');
        expect(errorText).toBeInTheDocument();
    })

    test('press remove editor button', () => {
        render(<EditersModal />);

        const removeEditorButton = screen.getAllByText('BUTTONS.DELETE')[0];
        fireEvent.click(removeEditorButton);
        expect(removeEditorButton).toBeInTheDocument();
        expect(removeEditorButton).toHaveTextContent('BUTTONS.DELETE');
    });
});
