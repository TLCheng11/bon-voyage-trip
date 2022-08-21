
import { GoogleMap, useJsApiLoader, Marker, MarkerClusterer, InfoWindow } from '@react-google-maps/api';
import { formatRelative } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';

function Map({mapRef, coordinates}) {
  // saving the map with a ref so we can have access without re-rendering
  const onMapLoad = useCallback(map => {
    mapRef.current = map
  }, [])

  // constants for google maps
  const [userMarkers, setUserMarker] = useState([])
  const liabraries = ["places"]
  const options = {
    disableDefaultUI: true,
    zoomControl: true,
  }

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    liabraries,
  })

  // constants for showing marker info
  const [selectedMarker, setselectedMarker] = useState(null);

  const showMarkers = userMarkers.map(marker => (
      <Marker 
        key={marker.time.toISOString()} 
        position={{lat: marker.lat, lng: marker.lng}}
        onClick={() => setselectedMarker(marker)}
      />
    ))
  
  // to fetch nearby hotel through ruby server
  // useEffect(() => {
  //   fetch(`/hotel?lat=${coordinates.lat}&lng=${coordinates.lng}&radius=1500&type=restaurant&keyword=cruise&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`)
  //   .then(res => res.json())
  //   .then(console.log)
  // }, [coordinates]);

  const onMapClick = useCallback(e => {
    setUserMarker(current => [
      ...current, 
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      }
    ])
  }, [])

  if (loadError) return <div>Error Loading map!</div>
  if (!isLoaded) return <div>Loading...</div>

  return (
    <div>
      <GoogleMap 
        onLoad={onMapLoad}
        zoom={15} 
        center={coordinates} 
        mapContainerClassName="h-192 w-full"
        options={options}
        onClick={onMapClick}
      >
        {showMarkers}
        {
          selectedMarker ? (
            <InfoWindow position={{lat: selectedMarker.lat, lng: selectedMarker.lng}} onCloseClick={() => setselectedMarker(null)}>
              <div>
                <p>{selectedMarker.lat}</p>
                <p>{selectedMarker.lng}</p>
                <p>{formatRelative(selectedMarker.time, new Date())}</p>
              </div>
            </InfoWindow>
          ) : (null)
        }
      </GoogleMap>
    </div>
  )
}

export default Map;