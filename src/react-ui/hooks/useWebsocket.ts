import { IMarker } from '@/modules/map/domain/map.model';
import { useCallback, useState } from 'react';
import io, { Socket } from 'socket.io-client';

export function useMarkersSubscription() {
    const [markers, setMarkers] = useState<IMarker[] | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [socket, setSocket] = useState<Socket | null>(null);

    const subscribe = useCallback((mapName: string, token: string) => {
        if (socket && socket.connected) {
            socket.removeAllListeners();
            socket.disconnect();
        }

        const newSocket = io('http://localhost:4000', {
            auth: {
                token: token,
            }
        });


        newSocket.on('MARKERS_RESPONSE', (updatedMarkers) => {
            setMarkers(updatedMarkers);
        });

        newSocket.emit('GET_MARKERS', mapName);


        newSocket.on('connect_error', (err) => {
            setError(new Error('Connection error: ' + err.message));
        });

        setSocket(newSocket);
    }, [socket]);

    const unsubscribe = useCallback(() => {
        if (socket) {
            socket.off('MARKERS_RESPONSE');
            socket.disconnect();
            setSocket(null);
        }
    }, [socket]);

    const addMarker = useCallback((mapName: string, data: IMarker) => {
        if (socket) {
            socket.emit('ADD_MARKER', { mapName, markerData: data });
        } else {
            setError(new Error('Socket is not connected'));
        }
    }, [socket]);

    const deleteMarker = useCallback((mapName: string, data: IMarker) => {
        if (socket) {
            const { name: markerName, latitude, longitude } = data;
            socket.emit('DELETE_MARKER', { mapName, markerName, latitude, longitude });
        } else {
            setError(new Error('Socket is not connected'));
        }
    }, [socket]);

    return {
        markers,
        error,
        subscribe,
        unsubscribe,
        addMarker,
        deleteMarker
    };
}


