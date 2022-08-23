import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import MapHolder from "../Maps/MapHolder";

function DailyPlanDetails() {
  let navigate = useNavigate()
  const [dailyPlan, setDailyPlan] = useState({})
  const params = useParams()
  
  useEffect(() => {
    fetch(`/daily_plans/${params.daily_plan_id}`)
    .then(res => res.json())
    .then(setDailyPlan)
    .catch(console.error)
  }, []);

  return (
    <div className="flex">
      <div className="w-1/3">
        <div>
          <button onClick={() => navigate(`/trip-details/${params.trip_id}`)}>Back</button>
          <h1>Day {params.day}</h1>
          <h2>{moment(dailyPlan.day).format("YYYY-MM-DD")}</h2>
        </div>
      </div>
      <div className="w-2/3">
        {
          dailyPlan.id ? (
            <MapHolder coordinates={{lat: dailyPlan.city_lat, lng: dailyPlan.city_lng}} />
          ) : (null)
        }
      </div>
    </div>
  );
}

export default DailyPlanDetails;