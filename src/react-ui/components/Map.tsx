import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Necesario para corregir el problema de los íconos de Leaflet en React
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadowUrl from 'leaflet/dist/images/marker-shadow.png';
import MarkerFrom from './MarkerFrom';

const defaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadowUrl,
  iconSize: [25, 41], // Ajusta el tamaño del icono
  iconAnchor: [12, 41], // Este valor ajusta el anclaje: [x, y] donde 'x' es el centro horizontal y 'y' la base
  popupAnchor: [0, -41], // Ajusta el popup para que se muestre justo sobre el marcador
});

L.Marker.prototype.options.icon = defaultIcon;

interface MarkerData {
  position: L.LatLng;
  text: string;
}

const Map: React.FC = () => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [newMarkerPosition, setNewMarkerPosition] = useState<L.LatLng | null>(null);
  const [newMarkerText, setNewMarkerText] = useState('');

  // Función para cerrar el formulario
  const closeForm = () => {
    setNewMarkerPosition(null);
    setNewMarkerText('');
  };

  // Maneja los clics en el mapa para establecer la posición del nuevo marcador
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        if (e.originalEvent.ctrlKey) {  // Verifica si Ctrl está siendo presionado
          setNewMarkerPosition(e.latlng); // Captura la posición donde el usuario hace Ctrl+Click
        }
      },
    });
    return null;
  };

  // Función para añadir un nuevo marcador
  const addMarker = () => {
    if (newMarkerPosition && newMarkerText) {
      setMarkers((prevMarkers) => [
        ...prevMarkers,
        { position: newMarkerPosition, text: newMarkerText },
      ]);
      setNewMarkerPosition(null); // Resetea la posición después de añadir el marcador
      setNewMarkerText(''); // Limpia el texto del formulario
    }
  };

  return (
    <div className='relative'>
      {/* Formulario flotante para crear un nuevo marcador */}
      {newMarkerPosition && (
        <div className="absolute top-40 z-50 p-4 rounded w-full max-w-[350px]">
          <MarkerFrom closeForm={closeForm} addMarker={addMarker} newMarkerText={newMarkerText} setNewMarkerText={setNewMarkerText} />
        </div>
      )}
      <MapContainer
        className='z-10 absolute'
        center={[36.502644, -6.272966]} // Starts at cadiz by default
        zoom={13}
        style={{ height: '100vh', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Renderiza los marcadores ya creados */}
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.position}>
            <Popup>{marker.text}</Popup>
          </Marker>
        ))}

        {/* Maneja los clics en el mapa */}
        <MapClickHandler />
      </MapContainer>
    </div>
  );
};

export default Map;
