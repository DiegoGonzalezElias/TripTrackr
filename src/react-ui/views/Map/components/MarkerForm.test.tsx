import { render, screen, fireEvent } from '@testing-library/react';
import MarkerFrom from './MarkerFrom';
import { useMarkerForm } from '@/react-ui/hooks/useMarkerForm';
import '@testing-library/jest-dom';

jest.mock('@/react-ui/hooks/useMarkerForm');

const mockSetNewMarkerText = jest.fn();
const mockAddMarker = jest.fn();
const mockCloseForm = jest.fn();

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe('MarkerFrom Component', () => {
    beforeEach(() => {
        (useMarkerForm as jest.Mock).mockReturnValue({
            description: '',
            setDescription: jest.fn(),
            buttonText: 'Add Marker',
            category: 'Restaurant',
            setCategory: jest.fn(),
            date: null,
            setDate: jest.fn(),
        });
    });

    it('should renders the form correctly', () => {
        render(
            <MarkerFrom
                newMarkerText="Test Marker"
                setNewMarkerText={mockSetNewMarkerText}
                addMarker={mockAddMarker}
                closeForm={mockCloseForm}
            />
        );

        expect(screen.getByText('CARD_TITLE.MARKER_MENU')).toBeInTheDocument();
        expect(screen.getByText('CARD_DESCRIPTION.ADD_YOUR_MARKER')).toBeInTheDocument();

        expect(screen.getByPlaceholderText('PLACEHOLDERS.MARKER_TEXT')).toHaveValue('Test Marker');
    });

    it('should updates the marker text when typing', () => {
        render(
            <MarkerFrom
                newMarkerText="Test Marker"
                setNewMarkerText={mockSetNewMarkerText}
                addMarker={mockAddMarker}
                closeForm={mockCloseForm}
            />
        );

        const input = screen.getByPlaceholderText('PLACEHOLDERS.MARKER_TEXT');
        fireEvent.change(input, { target: { value: 'Updated Marker' } });

        expect(mockSetNewMarkerText).toHaveBeenCalledWith('Updated Marker');
    });

    it('should calls addMarker when the button is clicked', () => {
        render(
            <MarkerFrom
                newMarkerText="Test Marker"
                setNewMarkerText={mockSetNewMarkerText}
                addMarker={mockAddMarker}
                closeForm={mockCloseForm}
            />
        );

        const button = screen.getByRole('button', { name: /Add Marker/i });
        fireEvent.click(button);

        expect(mockAddMarker).toHaveBeenCalled();
    });

    it('should closes the form when the close button is clicked', () => {
        render(
            <MarkerFrom
                newMarkerText="Test Marker"
                setNewMarkerText={mockSetNewMarkerText}
                addMarker={mockAddMarker}
                closeForm={mockCloseForm}
            />
        );

        const closeButton = screen.getByRole('button', { name: /X/i });
        fireEvent.click(closeButton);

        expect(mockCloseForm).toHaveBeenCalled();
    });
});
