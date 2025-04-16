import { APIProvider, Map, Marker, MapMouseEvent } from '@vis.gl/react-google-maps';
import { useState, useEffect } from 'react';

const key: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

interface MapProps {
  clickEnabled: boolean;
  MapChange?: (e: MapMouseEvent) => void;
  initialPosition?: { lat: number; lng: number };
}

const MapWrapper = ({ clickEnabled, MapChange, initialPosition }: MapProps) => {
  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(initialPosition ?? null);

  useEffect(() => {
    if (initialPosition) {
      setMarker(initialPosition);
    }
  }, [initialPosition]);

  const mapClick = (event: MapMouseEvent) => {
    if (!clickEnabled || !event.detail.latLng) return;

    const position = {
      lat: event.detail.latLng.lat,
      lng: event.detail.latLng.lng,
    };

    setMarker(position);
    MapChange?.(event);
  };

  return (
    <APIProvider apiKey={key}>
      <Map
        className="w-full h-full"
        defaultCenter={initialPosition || { lat: 33.950001, lng: -83.383331 }}
        defaultZoom={11}
        gestureHandling="greedy"
        disableDefaultUI={true}
        onClick={mapClick}
      >
        {marker && <Marker position={marker} />}
      </Map>
    </APIProvider>
  );
};

export default MapWrapper;
