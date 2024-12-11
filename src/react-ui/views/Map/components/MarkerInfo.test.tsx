import { render, screen } from '@testing-library/react';
import { MarkerData } from '@/modules/map/domain/map.model';
import MarkerInfo from './MarkerInfo';
import { LatLng, LatLngBounds } from 'leaflet';
import '@testing-library/jest-dom';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe('MarkerInfo Component', () => {
    const mockMarker: MarkerData = {
        text: 'Sample Marker',
        description: 'This is a sample marker',
        category: 'Park',
        date: '2024-10-30',
        position: {
            equals: function (): boolean {
                throw new Error('Function not implemented.');
            },
            distanceTo: function (): number {
                throw new Error('Function not implemented.');
            },
            wrap: function (): LatLng {
                throw new Error('Function not implemented.');
            },
            toBounds: function (): LatLngBounds {
                throw new Error('Function not implemented.');
            },
            clone: function (): LatLng {
                throw new Error('Function not implemented.');
            },
            lat: 0,
            lng: 0
        }
    };

    test('should render marker title and description', () => {
        render(
            <MarkerInfo marker={mockMarker} />
        );

        expect(screen.getByText(mockMarker.text)).toBeInTheDocument();
        expect(screen.getByText(mockMarker.description!)).toBeInTheDocument();
    });

    test('should display marker category', () => {
        render(
            <MarkerInfo marker={mockMarker} />
        );

        expect(screen.getByText(/Category:/i)).toBeInTheDocument();
        expect(screen.getByText(mockMarker.category)).toBeInTheDocument();
    });

    test('should render Calendar with the correct date if date exists', () => {
        render(
            <MarkerInfo marker={mockMarker} />
        );

        const calendarElement = screen.getByText('December 2024');
        expect(calendarElement).toBeInTheDocument();
    });

    test('should render delete button', () => {
        render(
            <MarkerInfo marker={mockMarker} />
        );

        const deleteButton = screen.getByRole('button', { name: /BUTTONS.DELETE_MARKER/i });
        expect(deleteButton).toBeInTheDocument();
        expect(deleteButton).not.toBeDisabled();
    });

    test('should not render Calendar if date is not provided', () => {
        const markerWithoutDate = { ...mockMarker, date: undefined };
        render(
            <MarkerInfo marker={markerWithoutDate} />
        );

        expect(screen.queryByLabelText(/Date/i)).not.toBeInTheDocument();
    });
});
