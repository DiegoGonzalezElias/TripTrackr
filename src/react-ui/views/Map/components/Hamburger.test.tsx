import { render, screen, fireEvent } from '@testing-library/react';
import Hamburger from './Hamburger';
import '@testing-library/jest-dom';
import { AuthProvider } from '@/react-ui/hooks/useAuth';
import { MapSettingsProvider } from '@/react-ui/hooks/useMapSettings';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

jest.mock('@/react-ui/hooks/useAuth', () => {
    return {
        AuthProvider: ({ children }: React.PropsWithChildren<object>) => <div>{children}</div>,
        useAuth: () => ({
            user: { name: 'Test User' },
        }),
    };
});

jest.mock('@/react-ui/hooks/userMapManagement', () => {
    return {
        useMapManagement: () => ({
            maps: ['test'],
            hasMap: true,
            createMap: jest.fn(),
            error: false,
            triggerDeleteMap: jest.fn(),
            deleteMapError: false,
            isDeleteMapLoading: false,
            triggerSelectMap: jest.fn(),
            isSelectMapLoading: false,
            selectMapError: false
        }),
    };
});

jest.mock('@/react-ui/hooks/useEditors', () => {
    return {
        useEditors: () => ({
            editors: ['testEditor'],
            editorsError: false,
            editorsLoading: false
        }),
    };
});

describe('Hamburger Component', () => {
    it('should renders the hamburger button', () => {
        render(
            <MapSettingsProvider>
                <AuthProvider>
                    <Hamburger />
                </AuthProvider>
            </MapSettingsProvider>
        );

        const hamburgerButton = screen.getByRole('button');
        expect(hamburgerButton).toBeInTheDocument();
    });

    it('should displays menu content on button click', () => {
        render(
            <MapSettingsProvider>
                <AuthProvider>
                    <Hamburger />
                </AuthProvider>
            </MapSettingsProvider>
        );

        const menuContent = screen.queryByText('HAMBURGER_MENU.EDITORS');
        expect(menuContent).not.toBeInTheDocument();

        const hamburgerButton = screen.getByRole('button');
        fireEvent.click(hamburgerButton);

        expect(screen.getByText('HAMBURGER_MENU.EDITORS')).toBeInTheDocument();
        expect(screen.getByText('HAMBURGER_MENU.LOGOUT')).toBeInTheDocument();
        expect(screen.getByText('HAMBURGER_MENU.ACCOUNT')).toBeInTheDocument();
        expect(screen.getByText('HAMBURGER_MENU.MAPS')).toBeInTheDocument();
    });

    it('should appear maps button and click it', () => {
        render(
            <MapSettingsProvider>
                <AuthProvider>
                    <Hamburger />
                </AuthProvider>
            </MapSettingsProvider>
        );

        const hamburgerButton = screen.getByTestId('hamburger-button');
        fireEvent.click(hamburgerButton);

        const mapsButton = screen.getByText('HAMBURGER_MENU.MAPS');
        fireEvent.click(mapsButton);

        expect(mapsButton).toBeInTheDocument();
    });

    it('should appear account button and click it', () => {
        render(
            <MapSettingsProvider>
                <AuthProvider>
                    <Hamburger />
                </AuthProvider>
            </MapSettingsProvider>
        );

        const hamburgerButton = screen.getByTestId('hamburger-button');
        fireEvent.click(hamburgerButton);

        const accountButton = screen.getByText('HAMBURGER_MENU.ACCOUNT');
        fireEvent.click(accountButton);

        expect(accountButton).toBeInTheDocument();
    });

    it('should appear logout button and click it', () => {
        render(<AuthProvider>
            <Hamburger />
        </AuthProvider>);

        const hamburgerButton = screen.getByTestId('hamburger-button');
        fireEvent.click(hamburgerButton);

        const logoutButton = screen.getByText('HAMBURGER_MENU.LOGOUT');
        fireEvent.click(logoutButton);

        expect(logoutButton).toBeInTheDocument();
    });

    it('should appear editors button and click it', () => {
        render(
            <MapSettingsProvider>
                <AuthProvider>
                    <Hamburger />
                </AuthProvider>
            </MapSettingsProvider>
        );

        const hamburgerButton = screen.getByTestId('hamburger-button');
        fireEvent.click(hamburgerButton);

        const editorsButton = screen.getByText('HAMBURGER_MENU.EDITORS');
        fireEvent.click(editorsButton);

        expect(editorsButton).toBeInTheDocument();
    });

    test('displays delete account option', () => {
        render(
            <MapSettingsProvider>
                <AuthProvider>
                    <Hamburger />
                </AuthProvider>
            </MapSettingsProvider>
        );

        const hamburgerButton = screen.getByRole('button');
        fireEvent.click(hamburgerButton);

        expect(screen.getByText('HAMBURGER_MENU.DELETE_ACCOUNT')).toBeInTheDocument();
    });

    it('should appear delete account button and click it', () => {
        render(
            <MapSettingsProvider>
                <AuthProvider>
                    <Hamburger />
                </AuthProvider>
            </MapSettingsProvider>
        );

        const hamburgerButton = screen.getByTestId('hamburger-button');
        fireEvent.click(hamburgerButton);

        const deleteButton = screen.getByText('HAMBURGER_MENU.DELETE_ACCOUNT');
        fireEvent.click(deleteButton);

        expect(deleteButton).toBeInTheDocument();
    });
});
