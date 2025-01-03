import { render, screen } from '@testing-library/react';
import { IMarker } from '@/modules/map/domain/map.model';
import MarkerInfo from './MarkerInfo';
import '@testing-library/jest-dom';
import { SocketProvider } from '@/react-ui/hooks/socketContext';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

const createMapMock = jest.fn().mockResolvedValue('map test');
jest.mock('@/react-ui/hooks/userMapManagement', () => {
    return {
        useMapManagement: () => ({
            maps: ['Map1', 'Map2', 'Map3'],
            hasMap: true,
            createMap: createMapMock,
            error: false,
            triggerDeleteMap: jest.fn(),
            deleteMapError: false,
            isDeleteMapLoading: false,
            triggerSelectMap: jest.fn(),
            isSelectMapLoading: false,
            selectMapError: false,
            editors: ['testEditor'],
            editorsError: false,
            editorsLoading: false
        }),
    };
});

describe('MarkerInfo Component', () => {
    const mockMarker: IMarker = {
        name: 'Sample Marker',
        description: 'This is a sample marker',
        category: 'restaurant',
        date: '2024-10-30',
        latitude: '0',
        longitude: '0',
    };

    test('should render marker title and description', () => {
        render(
            <SocketProvider>
                <MarkerInfo marker={mockMarker} />
            </SocketProvider>
        );

        expect(screen.getByText(mockMarker.name)).toBeInTheDocument();
        expect(screen.getByText(mockMarker.description!)).toBeInTheDocument();
    });

    test('should display marker category', () => {
        render(
            <SocketProvider>
                <MarkerInfo marker={mockMarker} />
            </SocketProvider>
        );

        expect(screen.getByText(/Category:/i)).toBeInTheDocument();
        expect(screen.getByText(mockMarker.category)).toBeInTheDocument();
    });

    test('should render Calendar with the correct date if date exists', () => {
        render(
            <SocketProvider>
                <MarkerInfo marker={mockMarker} />
            </SocketProvider>
        );

        const currentDate = new Date();
        const currentMonth = currentDate.toLocaleString('en-US', { month: 'long' });
        const capitalizedMonth = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);
        const currentYear = currentDate.getFullYear();
        console.log(`${capitalizedMonth} ${currentYear}`)

        const calendarElement = screen.getByText(`${capitalizedMonth} ${currentYear}`);
        expect(calendarElement).toBeInTheDocument();
    });

    test('should render delete button', () => {
        render(
            <SocketProvider>
                <MarkerInfo marker={mockMarker} />
            </SocketProvider>
        );

        const deleteButton = screen.getByRole('button', { name: /BUTTONS.DELETE_MARKER/i });
        expect(deleteButton).toBeInTheDocument();
        expect(deleteButton).not.toBeDisabled();
    });

    test('should not render Calendar if date is not provided', () => {
        const markerWithoutDate = { ...mockMarker, date: undefined };
        render(
            <SocketProvider>
                <MarkerInfo marker={markerWithoutDate} />
            </SocketProvider>

        );

        expect(screen.queryByLabelText(/Date/i)).not.toBeInTheDocument();
    });
});
