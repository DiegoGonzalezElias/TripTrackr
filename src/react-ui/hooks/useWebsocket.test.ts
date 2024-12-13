import { renderHook, act } from '@testing-library/react';
import { useMarkersSubscription } from './useWebsocket';
import { Socket } from 'socket.io-client';

// Mockear socket.io-client
jest.mock('socket.io-client', () => {
    const actual = jest.requireActual('socket.io-client');
    return {
        ...actual,
        __esModule: true,
        default: jest.fn(),
    };
});

import io from 'socket.io-client';

describe('useMarkersSubscription Hook', () => {
    let mockSocket: Partial<Socket>;

    beforeEach(() => {
        mockSocket = {
            on: jest.fn(),
            emit: jest.fn(),
            disconnect: jest.fn(),
            off: jest.fn(),
            removeAllListeners: jest.fn(),
            connected: true,
        };

        (io as jest.Mock).mockReturnValue(mockSocket);

        jest.clearAllMocks();
    });

    it('should initialize with null markers and no error', () => {
        const { result } = renderHook(() => useMarkersSubscription());

        expect(result.current.markers).toBeNull();
        expect(result.current.error).toBeNull();
    });

    it('should subscribe to markers and handle updates', () => {
        const mockMarkers = [{ id: '1', name: 'Test Marker' }];
        const { result } = renderHook(() => useMarkersSubscription());

        act(() => {
            result.current.subscribe('testMap', 'testToken');
        });

        expect(mockSocket.emit).toHaveBeenCalledWith('GET_MARKERS', 'testMap');
        expect(mockSocket.on).toHaveBeenCalledWith('MARKERS_RESPONSE', expect.any(Function));

        act(() => {
            const onMarkersResponse = (mockSocket.on as jest.Mock).mock.calls.find(
                ([eventName]) => eventName === 'MARKERS_RESPONSE'
            )[1];
            onMarkersResponse(mockMarkers);
        });

        expect(result.current.markers).toEqual(mockMarkers);
    });

    it('should handle connection errors', () => {
        const { result } = renderHook(() => useMarkersSubscription());

        act(() => {
            result.current.subscribe('testMap', 'testToken');
        });

        expect(mockSocket.on).toHaveBeenCalledWith('connect_error', expect.any(Function));

        act(() => {
            const onConnectError = (mockSocket.on as jest.Mock).mock.calls.find(
                ([eventName]) => eventName === 'connect_error'
            )[1];
            onConnectError(new Error('Test connection error'));
        });

        expect(result.current.error?.message).toBe('Connection error: Test connection error');
    });

    it('should unsubscribe from markers', () => {
        const { result } = renderHook(() => useMarkersSubscription());

        act(() => {
            result.current.subscribe('testMap', 'testToken');
        });

        act(() => {
            result.current.unsubscribe();
        });

        expect(mockSocket.off).toHaveBeenCalledWith('MARKERS_RESPONSE');
        expect(mockSocket.disconnect).toHaveBeenCalled();
        expect(result.current.markers).toBeNull();
    });

    it('should add a marker', () => {
        const { result } = renderHook(() => useMarkersSubscription());

        act(() => {
            result.current.subscribe('testMap', 'testToken');
        });

        const newMarker = { id: '2', name: 'New Marker' };
        act(() => {
            result.current.addMarker('testMap', newMarker as never);
        });

        expect(mockSocket.emit).toHaveBeenCalledWith('ADD_MARKER', {
            mapName: 'testMap',
            markerData: newMarker,
        });
    });

    it('should set error if addMarker is called without an active socket', () => {
        const { result } = renderHook(() => useMarkersSubscription());

        const newMarker = { id: '2', name: 'New Marker' };
        act(() => {
            result.current.addMarker('testMap', newMarker as never);
        });

        expect(result.current.error?.message).toBe('Socket is not connected');
    });

    it('should handle a new subscription by disconnecting the old socket', () => {
        const { result } = renderHook(() => useMarkersSubscription());

        act(() => {
            result.current.subscribe('testMap', 'testToken');
        });

        expect(mockSocket.disconnect).not.toHaveBeenCalled();

        act(() => {
            result.current.subscribe('anotherMap', 'anotherToken');
        });

        expect(mockSocket.disconnect).toHaveBeenCalled();
        expect(mockSocket.removeAllListeners).toHaveBeenCalled();
    });
});
