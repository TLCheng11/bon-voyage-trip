
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { useCallback, useRef, useState } from 'react';

function Map({mapHolderRef, coordinates, setCoordinates, nearby, point, setInfo, setAddingActivity, setAction}) {
  const mapRef = useRef()
  mapHolderRef.current = mapRef.current

  // saving the map with a ref so we can have access without re-rendering
  const onMapLoad = useCallback(map => {
    mapRef.current = map
  }, [])

  // constants for google maps
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
  const iconUrl = {
    lodging: "https://img.icons8.com/external-linector-lineal-color-linector/64/000000/external-hotel-hotel-service-linector-lineal-color-linector.png",
    restaurant: "https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-restaurant-wayfinding-flaticons-flat-flat-icons.png",
    tourist_attraction: "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-vacation-vacation-planning-diving-tour-flaticons-lineal-color-flat-icons-2.png",
    museum: "https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-musem-prehistoric-flaticons-flat-flat-icons.png",
  }
  const [pointSelected, setPointSelected] = useState(null);

  const showPoint = point.data ? (
    <Marker 
      position={point.type === "transportation_plan" ? {lat: point.data.destination_lat, lng: point.data.destination_lng} : {lat: point.data.lat, lng: point.data.lng}}
      icon={{
        url: point.iconUrl,
        scaledSize: new window.google.maps.Size(40, 40),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(20, 20),
      }}
      animation={window.google.maps.Animation.DROP}
      onClick={() => setPointSelected(point)}
    />
  ) : null

  const showMarkers = nearby.data ? nearby.data.map(marker => (
    <Marker 
      key={marker.place_id} 
      position={{lat: marker.geometry.location.lat, lng: marker.geometry.location.lng}}
      icon={{
        url: iconUrl[nearby.type],
        scaledSize: new window.google.maps.Size(40, 40),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(20, 20),
      }}
      animation={window.google.maps.Animation.DROP}
      onClick={() => setselectedMarker(marker)}
    />
    )) : null

  // useEffect(() => {
  //   if (mapRef.current) {
  //     mapRef.current.zoom = 15
  //   }
  // }, [coordinates]);
    
  // const [userMarkers, setUserMarker] = useState([])
  // const onMapClick = useCallback(e => {
  //   setUserMarker(current => [
  //     ...current, 
  //     {
  //       lat: e.latLng.lat(),
  //       lng: e.latLng.lng(),
  //       time: new Date(),
  //     }
  //   ])
  // }, [])

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
        // onClick={onMapClick}
      > 
        {showMarkers}
        {showPoint}
        {
          selectedMarker ? (
            <InfoWindow 
              position={{lat: selectedMarker.geometry.location.lat, lng: selectedMarker.geometry.location.lng}} 
              onCloseClick={() => setselectedMarker(null)} 
              onUnmount={() => setselectedMarker(null)}
            >
              <div>
                <p>{selectedMarker.name}</p>
                <p>{selectedMarker.vicinity}</p>
                {
                  selectedMarker.opening_hours ? (
                    selectedMarker.opening_hours.open_now ? (<p>Currently Open.</p>) : (<p>Closed</p>)
                    ) : (null)
                }
                {
                  selectedMarker.rating ? (
                    <p>Rating: {selectedMarker.rating}</p>
                    ) : (null)
                }
                <button 
                  className="text-blue-600 underline"
                  onClick={() => {
                    setInfo({...selectedMarker, type: nearby.type})
                    setAddingActivity(true)
                    setAction("fromMap")
                  }}
                >
                  Add Activity
                </button>
                {/* {
                  selectedMarker.photos ? (
                    <a href={selectedMarker.photos[0].html_attributions[0].match(/"(.*)"/g)[0].replaceAll('"', "")} target="_blank">view on google map</a>
                  ) : (null)
                } */}
              </div>
            </InfoWindow>
          ) : (null)
        }
        {
          pointSelected ? (
            pointSelected.type === "transportation_plan" ? (
              <InfoWindow 
                position={{lat: pointSelected.data.destination_lat, lng: pointSelected.data.destination_lng}} 
                onCloseClick={() => setPointSelected(null)} 
                onUnmount={() => setPointSelected(null)}
              >
                <div>
                  <p>{pointSelected.data.destination_city} ({pointSelected.data.destination_country})</p>
                </div>
              </InfoWindow>
            ) : (
              <InfoWindow 
              position={{lat: pointSelected.data.lat, lng: pointSelected.data.lng}} 
              onCloseClick={() => setPointSelected(null)} 
              onUnmount={() => setPointSelected(null)}
            >
              <div>
                <p>{pointSelected.data.name}</p>
                <p>{pointSelected.data.location}</p>
                {
                  pointSelected.rating ? (
                    <p>Rating: {pointSelected.rating}</p>
                    ) : (null)
                }
              </div>
            </InfoWindow>
            )
          ) :(null)
        }
      </GoogleMap>
    </div>
  )
}

export default Map;