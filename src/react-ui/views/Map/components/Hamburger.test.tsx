import { render, screen, fireEvent } from '@testing-library/react';
import Hamburger from './Hamburger';
import '@testing-library/jest-dom';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe('Hamburger Component', () => {
    it('should renders the hamburger button', () => {
        render(<Hamburger />);

        const hamburgerButton = screen.getByRole('button');
        expect(hamburgerButton).toBeInTheDocument();
    });

    it('should displays menu content on button click', () => {
        render(<Hamburger />);

        const menuContent = screen.queryByText('HAMBURGER_MENU.EDITORS');
        expect(menuContent).not.toBeInTheDocument();

        const hamburgerButton = screen.getByRole('button');
        fireEvent.click(hamburgerButton);

        expect(screen.getByText('HAMBURGER_MENU.EDITORS')).toBeInTheDocument();
        expect(screen.getByText('HAMBURGER_MENU.LOGOUT')).toBeInTheDocument();
        expect(screen.getByText('HAMBURGER_MENU.ACCOUNT')).toBeInTheDocument();
        expect(screen.getByText('HAMBURGER_MENU.MAPS')).toBeInTheDocument();
    });

    test('displays delete account option', () => {
        render(<Hamburger />);

        const hamburgerButton = screen.getByRole('button');
        fireEvent.click(hamburgerButton);

        expect(screen.getByText('HAMBURGER_MENU.DELETE_ACCOUNT')).toBeInTheDocument();
    });
});
