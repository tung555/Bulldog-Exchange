import {APIProvider, Map, Marker, MapMouseEvent} from '@vis.gl/react-google-maps';
import { useState } from 'react';

const key:string = "INSERT KEY";

interface mapProps  {
    clickEnabled: boolean;
    MapChange: (e:MapMouseEvent) => void
};


const MapWrapper = (props:mapProps) => {
    const [marker, setMarker] = useState<{lat:number,lng:number}>();

    const mapClick = (event: MapMouseEvent) => {
        if (event.detail.latLng) {
            setMarker({
                lat: event.detail.latLng.lat,
                lng: event.detail.latLng.lng
            });
        }
        props.MapChange(event);
    };
    const noClick = () => {
        return 0;
    }

    return (
        <APIProvider apiKey={key}>
            <Map className='w-full h-full' defaultCenter={{lat: 33.950001, lng: -83.383331}} defaultZoom={11} gestureHandling={'greedy'} disableDefaultUI={true} onClick={props.clickEnabled ? mapClick: noClick}>
                <Marker position={marker}></Marker>
            </Map>
        </APIProvider>

    )

};

export default MapWrapper;