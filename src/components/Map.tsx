import { APIProvider, Map as GoogleMap, Marker, DirectionsRenderer, useMap } from '@vis.gl/react-google-maps';
import { useEffect } from 'react';
import { useMapStore } from '../store/mapStore';

interface Props {
  apiKey: string;
}

export default function Map({ apiKey }: Props) {
  const { center, setCenter, places, setSelected, directions } = useMapStore();
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    const bounds = new google.maps.LatLngBounds();
    if (center) bounds.extend(center);
    places.forEach((p) => bounds.extend(p.position));
    if (!bounds.isEmpty()) {
      map.fitBounds(bounds);
    }
  }, [map, center, places]);

  return (
    <APIProvider apiKey={apiKey}>
      <GoogleMap
        style={{ width: '100%', height: '100%' }}
        defaultZoom={13}
        center={center ?? { lat: 37.7749, lng: -122.4194 }}
        onClick={(e) => {
          if (e.detail.latLng) setCenter(e.detail.latLng); // user click sets center
        }}
      >
        {center && (
          <Marker
            position={center}
            draggable
            onDragEnd={(e) =>
              setCenter({ lat: e.latLng.lat(), lng: e.latLng.lng() })
            }
          />
        )}
        {places.map((p) => (
          <Marker key={p.id} position={p.position} onClick={() => setSelected(p)} />
        ))}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </APIProvider>
  );
}
