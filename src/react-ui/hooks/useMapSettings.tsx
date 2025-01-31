import { createContext, useContext, useState } from "react";

interface MapSettingsContextType {
  isNumericalMarkers: boolean;
  toggleNumericalMarkers: () => void;
}

const MapSettingsContext = createContext<MapSettingsContextType | null>(null);

export const MapSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isNumericalMarkers, setIsNumericalMarkers] = useState<boolean>(() => {
    const storedValue = localStorage.getItem('numericalMarkers');
    return storedValue ? JSON.parse(storedValue) : false;
  });;

  const toggleNumericalMarkers = () => {
    setIsNumericalMarkers(prev => {
      const newValue = !prev;
      localStorage.setItem('numericalMarkers', JSON.stringify(newValue));
      return newValue;
    });
  }

  return (
    <MapSettingsContext.Provider value={{ isNumericalMarkers, toggleNumericalMarkers }}>
      {children}
    </MapSettingsContext.Provider>
  );
};

export const useMapSettings = () => {
  const context = useContext(MapSettingsContext);
  if (!context) {
    throw new Error('useMapSettings must be used within MapSettingsProvider');
  }
  return context;
};