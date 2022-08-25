import { useEffect, useRef, useState } from "react";
import Map from "./Map";

function MapHolder({mapHolderRef, coordinates, setCoordinates, point, setPoint, setInfo, setAddingActivity, setAction}) {
  // const [loadMap, setLoadMap] = useState(true)
  const [nearby, setNearby] = useState({});

  // console.log(nearby)
  console.log(point)

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
    <div className="activityPage">
      <div className="flex space-y-0 space-x-20 content-center">
        {/* <div>
          <button onClick={() => setLoadMap(true)}>LoadMap</button>
        </div> */}
        {/* <div>
          <button onClick={() => console.log(mapHolderRef.current.center.lat(), mapHolderRef.current.center.lng())}>Map center</button>
        </div> */}
        <div>
          <button className="bg-white hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-white rounded flex flex-wrap"          
          onClick={() => searchNearby("lodging")}>Nearby Hotels</button>
        </div>
        <div>
          <button className="bg-white hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-white rounded flex flex-wrap" 
          onClick={() => searchNearby("restaurant")}>Nearby Restaurants</button>
        </div>
        <div>
          <button className="bg-white hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-white rounded flex flex-wrap" 
          onClick={() => searchNearby("tourist_attraction")}>Nearby Attractions</button>
        </div>
        <div>
          <button className="bg-white hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-white rounded flex flex-wrap" 
          onClick={() => searchNearby("museum")}>Nearby Museums</button>
        </div>
        <div>
          <button className= "bg-white hover:bg-gray-100 text-red font-semibold py-2 px-4 border border-gray-400 rounded flex flex-wrap shadow p-[5px]"
            onClick={() => {
            setNearby({})
            setPoint({})
          }}>
            Clear
          </button>
        </div>
      </div>
      <Map mapHolderRef={mapHolderRef} coordinates={coordinates} setCoordinates={setCoordinates} nearby={nearby} point={point} setInfo={setInfo} setAddingActivity={setAddingActivity} setAction={setAction}/>
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