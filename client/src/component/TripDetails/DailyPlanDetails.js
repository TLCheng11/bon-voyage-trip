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
  // for info window add link
  const [info, setInfo] = useState({})
  const [action, setAction] = useState("new")
  const [coordinates, setCoordinates] = useState({lat: 0, lng: 0})
  
  // console.log(dailyPlan)
  // console.log(info)

  useEffect(() => {
    fetch(`/daily_plans/${params.daily_plan_id}`)
    .then(res => res.json())
    .then(data => {
      setDailyPlan(data)
      setActivities(data.activities)
      if (coordinates.lat === 0 && coordinates.lng === 0) {
        setCoordinates({lat: data.city_lat, lng: data.city_lng})
      }
    })
    .catch(console.error)
  }, [addingActivity, deleteActivity]);

  const showActivities = activities.sort((a, b) => {
    if (a.start_time > b.start_time) {
      return 1
    } else if (b.start_time > a.start_time) {
      return -1
    } else {
      return 0
    }
  }).map(activity => <Activity key={activity.id} activity={activity} setActivities={setActivities} setAction={setAction} setInfo={setInfo} setAddingActivity={setAddingActivity} setDeletActivity={setDeletActivity}/>)

  return (
    <div className="Activitypage flex bg-black h-full">
      {/* to show the add activity form */}
      {
        addingActivity ? <AddActivityForm action={action} setAction={setAction} info={info} dailyPlan={dailyPlan} setAddingActivity={setAddingActivity} setActivities={setActivities} /> : null
      }
      {/* for data */}
      <div className="h-full w-1/3">
        <div className="h-1/3 w-full p-5">
          <button 
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={() => navigate(`/trip-details/${params.trip_id}`)}>Back</button>
          <div className="h-1/3 w-2/3 p-2 border rounded-xl font-bold bg-stone-300 content-center">
            <h1>Day {params.day}</h1>
            <h2>{moment(dailyPlan.day).format("MM-DD-YYYY dddd")}</h2>
            <h2>{dailyPlan.city} ({dailyPlan.country})</h2>
          </div>
        </div>
        <div className="h-96 w-full p-5">
          <div className="h-full w-2/3 p-2 border rounded-xl overflow-x-hidden overflow-y-auto bg-stone-300 flex flex-col space-y-4 ">
            <div>
              <button className=
              "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={() => setAddingActivity(true)}>Add Activity</button>
            </div>
            <div>
              {showActivities}
            </div>
          </div>
        </div>
      </div>
      {/* for map */}
      <div className="h-full w-2/3">
        {
          dailyPlan.id ? (
            <MapHolder mapHolderRef={mapHolderRef} coordinates={coordinates} setCoordinates={setCoordinates} setInfo={setInfo} setAddingActivity={setAddingActivity} setAction={setAction} />
          ) : (null)
        }
      </div>
    </div>
  );
}

export default DailyPlanDetails;