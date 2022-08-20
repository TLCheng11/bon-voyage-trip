
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useEffect } from 'react';

function Map({coordinates}) {
  // const center = useMemo(() => (coordinates), [])

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY
  })

  // useEffect(() => {
  //   fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522%2C151.1957362&radius=1500&type=restaurant&keyword=cruise&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`)
  //   .then(res => res.json())
  //   .then(console.log)
  //   .catch(console.error)
  // }, [coordinates]);

  // useEffect(() => {
  //   fetch(`/hotel?lat=${coordinates.lat}&lng=${coordinates.lng}&radius=1500&type=restaurant&keyword=cruise&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`)
  //   .then(res => res.json())
  //   .then(console.log)
  // }, [coordinates]);
  
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