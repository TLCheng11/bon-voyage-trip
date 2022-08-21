import { useEffect, useRef, useState } from "react";
import Map from "./Map";

function MapHolder({coordinates}) {
  const mapRef = useRef()
  const [loadMap, setLoadMap] = useState(false)
  const [nearBy, setNearBy] = useState({});

  function searchNearby(type) {
    if(mapRef.current) {
      fetch(`/search?lat=${mapRef.current.center.lat()}&lng=${mapRef.current.center.lng()}&radius=1500&type=${type}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === "OK") {
          setNearBy({
            type: type,
            data: data.results
          })
        }
      })
    }
  }

  console.log(nearBy)

  return (
    <div>
      <div>
        <div>
          <button onClick={() => setLoadMap(true)}>LoadMap</button>
        </div>
        <div>
          <button onClick={() => console.log([mapRef.current.center.lat(), mapRef.current.center.lng()])}>Map Info...</button>
        </div>
        <div>
          <button onClick={() => searchNearby("lodging")}>Nearby Hotel</button>
        </div>
        <div>
          <button onClick={() => searchNearby("restaurant")}>Nearby Restaurants</button>
        </div>
        <div>
          <button onClick={() => searchNearby("tourist_attraction")}>Nearby Sigth Spot</button>
        </div>
        <div>
          <button onClick={() => searchNearby("museum")}>Nearby Museum</button>
        </div>
      </div>
      {
        loadMap ? (
          <Map mapRef={mapRef} coordinates={coordinates} nearBy={nearBy}/>
        ) : (
          null
        )
      }
    </div>
  );
}

export default MapHolder;