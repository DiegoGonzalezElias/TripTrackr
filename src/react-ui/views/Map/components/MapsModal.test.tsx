import { render, screen } from '@testing-library/react';
import MapsModal from './MapsModal';
import '@testing-library/jest-dom';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe('MapsModal Component', () => {
    const mockMaps = ['Map1', 'Map2', 'Map3'];

    test('renders the list of maps', () => {
        render(<MapsModal maps={mockMaps} />);

        // Verificar que cada mapa en la lista se renderiza correctamente
        mockMaps.forEach((map) => {
            expect(screen.getByText(map)).toBeInTheDocument();
        });
    });

    test('renders the select button', () => {
        render(<MapsModal maps={mockMaps} />);

        // Verificar que el botón de seleccionar está presente
        const selectButton = screen.getByRole('button', { name: 'BUTTONS.SELECT' });
        expect(selectButton).toBeInTheDocument();
    });

    test('renders correctly with an empty maps list', () => {
        render(<MapsModal maps={[]} />);

        // Verificar que no se muestren elementos en la lista
        const listItems = screen.queryAllByRole('listitem');
        expect(listItems.length).toBe(0);
    });
});
