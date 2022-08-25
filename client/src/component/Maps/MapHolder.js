import { useEffect, useRef, useState } from "react";
import Map from "./Map";

function MapHolder({mapHolderRef, coordinates, setCoordinates, setInfo, setAddingActivity, setAction}) {
  // const [loadMap, setLoadMap] = useState(true)
  const [nearby, setNearby] = useState({});

  // console.log(nearby)

  function searchNearby(type) {
    if(mapHolderRef.current) {
      fetch(`/search?lat=${mapHolderRef.current.center.lat()}&lng=${mapHolderRef.current.center.lng()}&radius=1500&type=${type}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`)
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
        {/* <div>
          <button onClick={() => setLoadMap(true)}>LoadMap</button>
        </div> */}
        {/* <div>
          <button onClick={() => console.log(mapHolderRef.current.center.lat(), mapHolderRef.current.center.lng())}>Map center</button>
        </div> */}
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
      <Map mapHolderRef={mapHolderRef} coordinates={coordinates} setCoordinates={setCoordinates} nearby={nearby} setInfo={setInfo} setAddingActivity={setAddingActivity} setAction={setAction}/>
      {/* {
        loadMap ? (
          <Map mapHolderRef={mapHolderRef} coordinates={coordinates} nearby={nearby} setInfo={setInfo} setAddingActivity={setAddingActivity} setAction={setAction}/>
        ) : (
          null
        )
      } */}
    </div>
  );
}

export default MapHolder;