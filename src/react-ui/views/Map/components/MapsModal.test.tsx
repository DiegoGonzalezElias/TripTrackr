import { render, screen } from '@testing-library/react';
import MapsModal from './MapsModal';
import '@testing-library/jest-dom';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

jest.mock('@/react-ui/hooks/userMapManagement', () => {
    return {
        useMapManagement: () => ({
            maps: ['Map1', 'Map2', 'Map3'],
            hasMap: true,
            createMap: jest.fn(),
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

describe('MapsModal Component', () => {

    test('renders the list of maps', () => {
        render(<MapsModal />);

        expect(screen.getAllByText('Map1')[0]).toBeInTheDocument();
        expect(screen.getAllByText('Map2')[0]).toBeInTheDocument();
        expect(screen.getAllByText('Map3')[0]).toBeInTheDocument();

    });

    test('renders the select button', () => {
        render(<MapsModal />);

        const selectButton = screen.getByRole('button', { name: 'BUTTONS.SELECT' });
        expect(selectButton).toBeInTheDocument();
    });

    test('renders correctly with an empty maps list', () => {
        render(<MapsModal />);

        const listItems = screen.queryAllByRole('listitem');
        expect(listItems.length).toBe(0);
    });
});
