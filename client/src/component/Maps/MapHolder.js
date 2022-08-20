import { useState } from "react";
import Map from "./Map";

function MapHolder({coordinates}) {
  const [loadMap, setloadMap] = useState(false)


  return (
    <div>
      <div>
        <button onClick={() => setloadMap(true)}>LoadMap</button>
      </div>
      {
        loadMap ? (
          <div>
            <Map coordinates={coordinates}/>
          </div>
        ) : (
          null
        )
      }
    </div>
  );
}

export default MapHolder;