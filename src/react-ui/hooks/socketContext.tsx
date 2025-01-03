// SocketContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import { useMarkersSubscription } from './useWebsocket';
import { IMarker } from '@/modules/map/domain/map.model';

interface SocketContextProps {
    markers: IMarker[] | null;
    error: Error | null;
    subscribe: (mapName: string, token: string) => void;
    unsubscribe: () => void;
    addMarker: (mapName: string, data: IMarker) => void;
    deleteMarker: (mapName: string, data: IMarker) => void;
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const SocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const socketData = useMarkersSubscription(); // Usamos el hook aquí

    return (
        <SocketContext.Provider value={socketData}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocketContext = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocketContext must be used within a SocketProvider');
    }
    return context;
};
