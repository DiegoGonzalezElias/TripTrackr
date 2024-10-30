import { render, screen, fireEvent } from '@testing-library/react';
import FirstMapModal from './FirstMapModal';
import '@testing-library/jest-dom';
import { useMapManagement } from '@/react-ui/hooks/userMapManagement';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

// Mock de useMapManagement para simular la función createMap
jest.mock('@/react-ui/hooks/userMapManagement', () => ({
    useMapManagement: jest.fn(),
}));

describe('FirstMapModal Component', () => {
    const mockCreateMap = jest.fn();

    beforeEach(() => {
        (useMapManagement as jest.Mock).mockReturnValue({
            createMap: mockCreateMap,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders map name input and create map button', () => {
        render(<FirstMapModal />);

        // Verifica que el input para el nombre del mapa se muestre
        const mapNameInput = screen.getByPlaceholderText('PLACEHOLDERS.ADD_MAP_NAME');
        expect(mapNameInput).toBeInTheDocument();

        // Verifica que el botón de crear mapa se muestre
        const createMapButton = screen.getByRole('button', { name: 'BUTTONS.CREATE_MAP' });
        expect(createMapButton).toBeInTheDocument();
    });

    test('updates map name state on input change', () => {
        render(<FirstMapModal />);

        const mapNameInput = screen.getByPlaceholderText('PLACEHOLDERS.ADD_MAP_NAME');

        // Simula el ingreso de texto en el campo del nombre del mapa
        fireEvent.change(mapNameInput, { target: { value: 'My New Map' } });
        expect(mapNameInput).toHaveValue('My New Map');
    });

    test('shows error message when creating map with empty name', async () => {
        render(<FirstMapModal />);

        const createMapButton = screen.getByRole('button', { name: 'BUTTONS.CREATE_MAP' });

        // Simula el clic en el botón sin ingresar un nombre de mapa
        fireEvent.click(createMapButton);

        const errorMessage = screen.getByText('Please provide a map name');
        expect(errorMessage).toBeInTheDocument();
    });

    test('calls createMap function with the map name when provided', async () => {
        render(<FirstMapModal />);

        const mapNameInput = screen.getByPlaceholderText('PLACEHOLDERS.ADD_MAP_NAME');
        const createMapButton = screen.getByRole('button', { name: 'BUTTONS.CREATE_MAP' });

        // Simula el ingreso de un nombre y clic en el botón de creación
        fireEvent.change(mapNameInput, { target: { value: 'My New Map' } });
        fireEvent.click(createMapButton);

        expect(mockCreateMap).toHaveBeenCalledWith('My New Map');
        expect(mockCreateMap).toHaveBeenCalledTimes(1);
    });

    test('shows error message if createMap fails', async () => {
        mockCreateMap.mockRejectedValueOnce(new Error('Failed to create map'));

        render(<FirstMapModal />);

        const mapNameInput = screen.getByPlaceholderText('PLACEHOLDERS.ADD_MAP_NAME');
        const createMapButton = screen.getByRole('button', { name: 'BUTTONS.CREATE_MAP' });

        // Simula el ingreso de un nombre y el fallo en la creación
        fireEvent.change(mapNameInput, { target: { value: 'My New Map' } });
        fireEvent.click(createMapButton);

        const errorMessage = await screen.findByText('Failed to create map');
        expect(errorMessage).toBeInTheDocument();
    });
});
