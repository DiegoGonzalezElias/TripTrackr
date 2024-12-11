import { render, screen } from '@testing-library/react';
import MapView from './index';
import '@testing-library/jest-dom';
import { useMapManagement } from '@/react-ui/hooks/userMapManagement';
import { AuthProvider } from '@/react-ui/hooks/useAuth';
import { SocketProvider } from '@/react-ui/hooks/socketContext';


jest.mock('@/react-ui/hooks/userMapManagement', () => ({
    useMapManagement: jest.fn(),
}));

jest.mock("./components/Map", () => ({
    __esModule: true,
    default: () => (
        <div data-testId='map-component'>
            <p>Map</p>
        </div>
    ),
}));

jest.mock('@/react-ui/hooks/useAuth', () => {
    return {
        AuthProvider: ({ children }: React.PropsWithChildren<object>) => <div>{children}</div>,
        useAuth: () => ({
            user: { name: 'Test User' },
        }),
    };
});

describe('MapView Component', () => {
    const mockUseMapManagement = useMapManagement as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders FirstMapModal when user has no map', () => {
        mockUseMapManagement.mockReturnValue({ hasMap: false });

        render(
            <AuthProvider>
                <SocketProvider>
                    <MapView />
                </SocketProvider>
            </AuthProvider>
        );

        expect(screen.getByText('CARD_TITLE.CREATE_FIRST_MAP')).toBeInTheDocument();
        expect(screen.getByTestId('map-component')).toBeInTheDocument();
    });

    test('renders Hamburger when user has a map', () => {
        mockUseMapManagement.mockReturnValue({ hasMap: true });

        render(
            <AuthProvider>
                <SocketProvider>
                    <MapView />
                </SocketProvider>
            </AuthProvider>
        );

        const hamburgerButton = screen.getByTestId("hamburger-button");
        expect(hamburgerButton).toBeInTheDocument();
        expect(screen.getByTestId('map-component')).toBeInTheDocument();
    });

    test('renders Map with hasMap boolean true', () => {
        mockUseMapManagement.mockReturnValue({ hasMap: true });
        render(
            <AuthProvider>
                <SocketProvider>
                    <MapView />
                </SocketProvider>
            </AuthProvider>
        );
        expect(screen.getByTestId('map-component')).toBeInTheDocument();
    });

    test('renders Map with hasMap boolean false', () => {
        mockUseMapManagement.mockReturnValue({ hasMap: false });
        render(
            <AuthProvider>
                <SocketProvider>
                    <MapView />
                </SocketProvider>
            </AuthProvider>
        );
        expect(screen.getByTestId('map-component')).toBeInTheDocument();
    });
});
