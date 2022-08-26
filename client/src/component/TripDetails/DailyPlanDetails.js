import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import MapHolder from "../Maps/MapHolder";
import AddActivityForm from "./AddActivityForm";
import Activity from "./Activity";

function DailyPlanDetails() {
  let navigate = useNavigate()
  const params = useParams()
  const mapHolderRef = useRef()
  const [dailyPlan, setDailyPlan] = useState({activities: []})
  const [activities, setActivities] = useState([])
  const [addingActivity, setAddingActivity] = useState(false)
  const [deleteActivity, setDeletActivity] = useState(false)
  const [point, setPoint] = useState({});
  // for info window add link
  const [info, setInfo] = useState({})
  const [action, setAction] = useState("new")
  const [coordinates, setCoordinates] = useState({lat: 0, lng: 0})
  
  // console.log(dailyPlan)
  // console.log(info)

  useEffect(() => {
    fetch(`/daily_plans/${params.daily_plan_id}`)
    .then(res => {
      if (res.ok) {
        res.json().then(data => {
          setDailyPlan(data)
          setActivities(data.activities)
          if (coordinates.lat === 0 && coordinates.lng === 0) {
            setCoordinates({lat: data.city_lat, lng: data.city_lng})
          }
        })
      } else {
        navigate("/")
      }
    })
    .catch(console.error)
  }, [addingActivity, deleteActivity]);

  const sortActivities = activities.sort((a, b) => {
    if (a.start_time > b.start_time) {
      return 1
    } else if (b.start_time > a.start_time) {
      return -1
    } else {
      return 0
    }
  })

  const showActivities = sortActivities.filter(activity => !activity.hotel_booking)
  .map(activity => <Activity key={activity.id} mapHolderRef={mapHolderRef} activity={activity} setActivities={setActivities} setAction={setAction} setInfo={setInfo} setAddingActivity={setAddingActivity} setDeletActivity={setDeletActivity} setCoordinates={setCoordinates} setPoint={setPoint}/>)

  const showHotels = sortActivities.filter(activity => activity.hotel_booking)
  .map(activity => <Activity key={activity.id} mapHolderRef={mapHolderRef} activity={activity} setActivities={setActivities} setAction={setAction} setInfo={setInfo} setAddingActivity={setAddingActivity} setDeletActivity={setDeletActivity} setCoordinates={setCoordinates} setPoint={setPoint}/>)

  return (
    <div className="Activitypage flex bg-black h-screen w-screen">
      {/* to show the add activity form */}
      {
        addingActivity ? <AddActivityForm action={action} setAction={setAction} info={info} dailyPlan={dailyPlan} setAddingActivity={setAddingActivity} setActivities={setActivities} /> : null
      }
      {/* for data */}
      <div className="h-1/6 w-1/3">
        <div className="h-full w-full p-5 flex-col space-y-4">
          <button 
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={() => navigate(`/trip-details/${params.trip_id}`)}>Back</button>
          <div className="h-2/3 w-full p-2 border rounded-xl font-bold bg-stone-300 content-center flex space-y-5 space-x-12">
            <h1>Day {params.day}</h1>
            <h2>{moment(dailyPlan.day).format("MM-DD-YYYY dddd")}</h2>
            <h2 className="cursor-pointer hover:underline" onClick={() => {
              setCoordinates({lat: dailyPlan.city_lat, lng: dailyPlan.city_lng})
              mapHolderRef.current.zoom = 15
            }}
            >{dailyPlan.city} ({dailyPlan.country})</h2>
          </div>
        </div>
        <div className="bg-transparent text-white font-semibold  py-2  rounded uppercase w-full"><div className="text-center">Activities:</div></div>
        <div className="h-96 w-full p-5">
          <div className="h-full w-full p-2 border rounded-xl overflow-x-hidden overflow-y-auto bg-stone-300 flex flex-col space-y-4 ">
            <div>
              <button className=
              "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={() => setAddingActivity(true)}>Add Activity / Travel Plan</button>
            </div>
            <div>
              {showActivities}
            </div>
          </div>
        </div>
        <div className="bg-transparent text-white font-semibold  pb-5  rounded uppercase w-full">
          <div className="text-center">Hotels:</div>
        </div>
        <div className="h-48 w-full px-5">
          <div className="h-full w-full p-2 border rounded-xl overflow-x-hidden overflow-y-auto bg-stone-300 flex flex-col space-y-4 ">
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={() => {
                setAddingActivity(true)
                setAction("hotel")
              }}
            >Add Hotel</button>
            {showHotels}
          </div>
        </div>
      </div>
      {/* for map */}
      <div className="h-full w-2/3">
        {
          dailyPlan.id ? (
            <MapHolder mapHolderRef={mapHolderRef} coordinates={coordinates} setCoordinates={setCoordinates} point={point} setPoint={setPoint} setInfo={setInfo} setAddingActivity={setAddingActivity} setAction={setAction} />
          ) : (null)
        }
      </div>
    </div>
  );
}

export default DailyPlanDetails;