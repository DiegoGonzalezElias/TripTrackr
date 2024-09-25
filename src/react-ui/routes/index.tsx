import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import AccessView from '../views/Access/index.tsx';
import MapView from '../views/Map/index.tsx';

const RouterComponent = () => {
    const userIsLogged = false;

    return (
        <Router basename={import.meta.env.VITE_APP_BASE_URL as string}>
            <Routes>
                {/* Ruta raíz: Redirige según el estado del usuario */}
                <Route
                    path='/'
                    element={<Navigate to={userIsLogged ? '/map' : '/access'} />}
                />

                {/* Ruta de acceso */}
                <Route
                    path='/access'
                    element={!userIsLogged ? <AccessView /> : <Navigate to='/map' />}
                />

                {/* Ruta para el mapa si el usuario está logueado */}
                <Route
                    path='/map'
                    element={userIsLogged ? <MapView /> : <Navigate to='/access' />}
                />

                {/* Ruta por defecto si la ruta no existe */}
                <Route path='*' element={<Navigate to={userIsLogged ? '/map' : '/access'} />} />
            </Routes>
        </Router>
    );
};

export default RouterComponent;
