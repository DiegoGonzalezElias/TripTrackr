import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Necesario para corregir el problema de los íconos de Leaflet en React
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadowUrl from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadowUrl,
});

L.Marker.prototype.options.icon = defaultIcon;

const Map: React.FC = () => {
  return (
    <MapContainer
      center={[36.502644, -6.272966]} // Starts at cadiz by default
      zoom={13}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[36.502644, -6.272966]}>
        <Popup>
          El campo furbo!
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
