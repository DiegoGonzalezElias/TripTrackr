import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadowUrl from 'leaflet/dist/images/marker-shadow.png';
import MarkerFrom from './MarkerFrom';
import { useMapManagement } from '@/react-ui/hooks/userMapManagement';
import { IMarker } from '@/modules/map/domain/map.model';

const defaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});

L.Marker.prototype.options.icon = defaultIcon;

interface MarkerData {
  position: L.LatLng;
  text: string;
}

const Map: React.FC = () => {
  const [newMarkerPosition, setNewMarkerPosition] = useState<L.LatLng | null>(null);
  const [newMarkerText, setNewMarkerText] = useState('');
  const { handdleAddMarker: addNewMarker, maps, markers } = useMapManagement();  // get markers from useMapManagement
  const [localMarkers, setLocalMarkers] = useState<MarkerData[]>([]); // local state for map markers
  const [isMarkerLoading, setIsMarkerLoading] = useState(false);

  // Update local markers state when SWR markers change
  useEffect(() => {
    if (markers) {
      setLocalMarkers(markers.map(marker => ({
        position: L.latLng(parseFloat(marker.latitude), parseFloat(marker.longitude)),
        text: marker.name,
      })));
    } else {
      setLocalMarkers([])
    }
  }, [markers]);

  const closeForm = () => {
    setNewMarkerPosition(null);
    setNewMarkerText('');
  };

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        if (e.originalEvent.ctrlKey) {
          setNewMarkerPosition(e.latlng);
        }
      },
    });
    return null;
  };

  const addMarker = async (markerData: IMarker) => {
    if (newMarkerPosition && newMarkerText && maps) {
      setIsMarkerLoading(true);
      try {
        setLocalMarkers((prevMarkers) => [
          ...prevMarkers,
          { position: newMarkerPosition, text: newMarkerText },
        ]);

        await addNewMarker(maps[0], markerData)
          .then(() => console.log('marker added!'))
          .catch((err) => console.log('error adding marker: ', err.message)).finally(() => {
            setNewMarkerPosition(null);
            setNewMarkerText('');
          });
      } catch (error) {
        console.error('Error adding marker: ', error);
      } finally {
        setIsMarkerLoading(false)
      }

    }
  };

  return (
    <div className='relative'>
      {newMarkerPosition && (
        <div className="absolute top-40 z-50 p-4 rounded w-full max-w-[350px]">
          <MarkerFrom closeForm={closeForm} addMarker={addMarker} newMarkerText={newMarkerText} setNewMarkerText={setNewMarkerText} lat={newMarkerPosition.lat.toString()} lng={newMarkerPosition.lng.toString()} isLoading={isMarkerLoading} />
        </div>
      )}
      <MapContainer className='z-10 absolute' center={[36.502644, -6.272966]} zoom={13} style={{ height: '100vh', width: '100%' }}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {localMarkers.map((marker, index) => (
          <Marker key={index} position={marker.position}>
            <Popup>{marker.text}</Popup>
          </Marker>
        ))}

        <MapClickHandler />
      </MapContainer>
    </div>
  );
};

export default Map;
