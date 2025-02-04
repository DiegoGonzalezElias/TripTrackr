import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadowUrl from 'leaflet/dist/images/marker-shadow.png';
import MarkerFrom from './MarkerFrom';
import { useMapManagement } from '@/react-ui/hooks/userMapManagement';
import { IMarker } from '@/modules/map/domain/map.model';
import { useAuth } from '@/react-ui/hooks/useAuth';
import { useSocketContext } from '@/react-ui/hooks/socketContext';
import MarkerInfo from './MarkerInfo';
import { useMapSettings } from '@/react-ui/hooks/useMapSettings';

const defaultIcon = (visited: boolean) => L.icon({
  iconUrl,
  shadowUrl: iconShadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
  className: visited ? 'opacity-50' : ''
});


const createNumberedIcon = (number: number, visited: boolean) => {
  return L.divIcon({
    className: `custom-div-icon ${visited ? 'opacity-50' : ''}`,
    html: `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        position:relative;
        margin-top: -50px;
      ">
        <div style="
        background-color: white;
        border: 2px solid #3388ff;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: bold;
        color: #3388ff;
        position: absolute
        top: 30px;
        ">
          ${number}
        </div>
        <img src=${iconUrl}>
      </div>
      
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
};


const Map: React.FC = () => {
  const [newMarkerPosition, setNewMarkerPosition] = useState<L.LatLng | null>(null);
  const [newMarkerText, setNewMarkerText] = useState('');
  const { addMarker: addNewMarker, markers } = useSocketContext();
  const { maps } = useMapManagement();
  const [isMarkerLoading, setIsMarkerLoading] = useState(false);
  const { accessToken } = useAuth();
  const { isNumericalMarkers } = useMapSettings();

  const handdleAddMarker = async (mapName: string, data: IMarker) => {
    if (accessToken) {
      addNewMarker(mapName, data)
    }
  };

  const closeForm = () => {
    setNewMarkerPosition(null);
    setNewMarkerText('');
  };

  const MapClickHandler = () => {
    const [lastClick, setLastClick] = useState<number>(0);
    const isSmallScreen = window.innerWidth < 1200;

    useMapEvents({
      click(e) {
        if (!isSmallScreen && e.originalEvent.ctrlKey) {
          setNewMarkerPosition(e.latlng);
          return;
        }

        if (isSmallScreen) {
          const clickTime = Date.now();
          const timeDiff = clickTime - lastClick;

          if (timeDiff < 300) {
            e.originalEvent.preventDefault();
            setNewMarkerPosition(e.latlng);
          }

          setLastClick(clickTime);
        }
      }
    });

    return null;
  };

  const addMarker = async (markerData: IMarker) => {
    if (newMarkerPosition && newMarkerText && maps) {
      setIsMarkerLoading(true);

      try {
        await handdleAddMarker(maps[0], markerData)
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
      <MapContainer className='z-10 absolute' doubleClickZoom={false} center={[36.502644, -6.272966]} zoom={13} style={{ height: '100vh', width: '100%' }}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {markers?.map((marker, index) => (
          <Marker key={index} position={L.latLng(parseFloat(marker.latitude), parseFloat(marker.longitude))} icon={isNumericalMarkers ? createNumberedIcon(index + 1, marker.visited) : defaultIcon(marker.visited)}>
            <Popup className={`${isNumericalMarkers && 'bottom-marker'}`} closeButton={false} maxWidth={285} key={`popup-${marker.name}-${isNumericalMarkers}`}>
              <MarkerInfo marker={marker} />
            </Popup>
          </Marker>
        ))}

        <MapClickHandler />
      </MapContainer>
    </div>
  );
};

export default Map;
