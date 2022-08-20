
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useMemo } from 'react';

function Map({coordinates}) {
  // const center = useMemo(() => (coordinates), [])

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY
  })
  
  if (!isLoaded) return <div>Loading...</div>

  return (
    <div>
      <GoogleMap 
        zoom={15} 
        center={coordinates} 
        mapContainerClassName="h-screen w-full"
      >
        <Marker position={coordinates}/>
      </GoogleMap>
    </div>
  )
}

export default Map;