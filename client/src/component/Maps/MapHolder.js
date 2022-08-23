import { useEffect, useRef, useState } from "react";
import Map from "./Map";

function MapHolder({coordinates}) {
  const mapRef = useRef()
  const [loadMap, setLoadMap] = useState(false)
  const [nearby, setNearby] = useState({});

  // console.log(nearby)

  function searchNearby(type) {
    if(mapRef.current) {
      fetch(`/search?lat=${mapRef.current.center.lat()}&lng=${mapRef.current.center.lng()}&radius=1500&type=${type}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === "OK") {
          // console.log(data.results)
          setNearby({
            type: type,
            data: data.results
          })
        } else {
          setNearby({})
          switch (type) {
            case "lodging":
              alert(`No Hotel nearby.`)
              break;
            case "restaurant":
              alert("No Restaurant nearby.")
              break;
            case "tourist_attraction":
              alert("No Sight Spot nearby.")
              break;
            case "museum":
              alert("No Museum nearby")
              break;
            default:
              break;
          }
        }
      })
    }
  }

  return (
    <div>
      <div>
        <div>
          <button onClick={() => setLoadMap(true)}>LoadMap</button>
        </div>
        <div>
          <button onClick={() => console.log(mapRef.current.center.lat(), mapRef.current.center.lng())}>Map center</button>
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
        <div>
          <button onClick={() => setNearby({})}>Clear</button>
        </div>
      </div>
      {
        loadMap ? (
          <Map mapRef={mapRef} coordinates={coordinates} nearby={nearby}/>
        ) : (
          null
        )
      }
    </div>
  );
}

export default MapHolder;