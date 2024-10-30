import { render, screen, fireEvent } from "@testing-library/react";
import AccessView from "./index";
import '@testing-library/jest-dom';
import { AuthProvider } from "@/react-ui/hooks/useAuth";

jest.mock("./components/LoginForm", () => ({
    __esModule: true,
    default: ({ switchForm }: { switchForm: (newValue: boolean) => void }) => (
        <div>
            <p>LoginForm</p>
            <button onClick={() => switchForm(false)}>Switch to Register</button>
        </div>
    ),
}));

jest.mock("./components/RegisterForm", () => ({
    __esModule: true,
    default: ({ switchForm }: { switchForm: (newValue: boolean) => void }) => (
        <div>
            <p>RegisterForm</p>
            <button onClick={() => switchForm(true)}>Switch to Login</button>
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

describe("AccessView", () => {
    test("renders the login form by default", () => {
        // Renderiza el componente
        render(
            <AuthProvider>
                <AccessView />
            </AuthProvider>
        );

        // Verifica que el LoginForm esté presente en el documento
        expect(screen.getByText("LoginForm")).toBeInTheDocument();
        expect(screen.queryByText("RegisterForm")).not.toBeInTheDocument();
    });

    test("switches to the register form when the switch button is clicked", () => {
        // Renderiza el componente
        render(
            <AuthProvider>
                <AccessView />
            </AuthProvider>
        );

        // Verifica que el LoginForm esté presente al inicio
        expect(screen.getByText("LoginForm")).toBeInTheDocument();

        // Simula el click en el botón de cambio de formulario
        fireEvent.click(screen.getByText("Switch to Register"));

        // Verifica que ahora se muestre el RegisterForm
        expect(screen.getByText("RegisterForm")).toBeInTheDocument();
        expect(screen.queryByText("LoginForm")).not.toBeInTheDocument();
    });

    test("switches back to the login form when the switch button is clicked again", () => {
        // Renderiza el componente
        render(
            <AuthProvider>
                <AccessView />
            </AuthProvider>
        );

        // Simula el cambio a RegisterForm
        fireEvent.click(screen.getByText("Switch to Register"));
        expect(screen.getByText("RegisterForm")).toBeInTheDocument();

        // Simula el cambio de vuelta a LoginForm
        fireEvent.click(screen.getByText("Switch to Login"));

        // Verifica que LoginForm esté nuevamente en el documento
        expect(screen.getByText("LoginForm")).toBeInTheDocument();
        expect(screen.queryByText("RegisterForm")).not.toBeInTheDocument();
    });
});
