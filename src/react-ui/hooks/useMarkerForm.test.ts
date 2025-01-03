import { renderHook, act } from '@testing-library/react';
import { useMarkerForm } from './useMarkerForm';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe('useMarkerForm Hook', () => {
    let mockSetNewMarkerText: jest.Mock;

    beforeEach(() => {
        mockSetNewMarkerText = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should initialize state correctly', () => {
        const { result } = renderHook(() =>
            useMarkerForm('Initial Marker', mockSetNewMarkerText)
        );

        expect(result.current.description).toBe('');
        expect(result.current.buttonText).toBe('BUTTONS.ADD_MARKER');
        expect(result.current.category).toBe('restaurant');
        expect(result.current.date).toBeUndefined();
        expect(result.current.newMarkerText).toBe('Initial Marker');
    });

    it('should update description state when setDescription is called', () => {
        const { result } = renderHook(() =>
            useMarkerForm('Initial Marker', mockSetNewMarkerText)
        );

        act(() => {
            result.current.setDescription('New description');
        });

        expect(result.current.description).toBe('New description');
    });

    it('should update category state when setCategory is called', () => {
        const { result } = renderHook(() =>
            useMarkerForm('Initial Marker', mockSetNewMarkerText)
        );

        act(() => {
            result.current.setCategory('SELECT_OPTIONS.PARK');
        });

        expect(result.current.category).toBe('SELECT_OPTIONS.PARK');
    });

    it('should update date state when setDate is called', () => {
        const testDate = new Date();
        const { result } = renderHook(() =>
            useMarkerForm('Initial Marker', mockSetNewMarkerText)
        );

        act(() => {
            result.current.setDate(testDate);
        });

        expect(result.current.date).toBe(testDate);
    });

    it('should call setNewMarkerText when updating newMarkerText', () => {
        const { result } = renderHook(() =>
            useMarkerForm('Initial Marker', mockSetNewMarkerText)
        );

        act(() => {
            result.current.setNewMarkerText('Updated Marker');
        });

        expect(mockSetNewMarkerText).toHaveBeenCalledWith('Updated Marker');
    });

    it('should update buttonText based on window width', () => {
        const { result } = renderHook(() =>
            useMarkerForm('Initial Marker', mockSetNewMarkerText)
        );

        act(() => {
            window.innerWidth = 500;
            window.dispatchEvent(new Event('resize'));
        });

        expect(result.current.buttonText).toBe('BUTTONS.ADD');

        act(() => {
            window.innerWidth = 800;
            window.dispatchEvent(new Event('resize'));
        });

        expect(result.current.buttonText).toBe('BUTTONS.ADD_MARKER');
    });

    it('should clean up resize event listener on unmount', () => {
        const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
        const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

        const { unmount } = renderHook(() =>
            useMarkerForm('Initial Marker', mockSetNewMarkerText)
        );

        expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));

        unmount();

        expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    });
});
