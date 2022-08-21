import { useRef, useState } from "react";
import Map from "./Map";

function MapHolder({coordinates}) {
  const mapRef = useRef()
  const [loadMap, setloadMap] = useState(false)

  return (
    <div>
      <div>
        <div>
          <button onClick={() => setloadMap(true)}>LoadMap</button>
        </div>
        <div>
          <button onClick={() => console.log([mapRef.current.center.lat(), mapRef.current.center.lng()])}>Map Info...</button>
        </div>
      </div>
      {
        loadMap ? (
          <div>
            <Map mapRef={mapRef} coordinates={coordinates}/>
          </div>
        ) : (
          null
        )
      }
    </div>
  );
}

export default MapHolder;