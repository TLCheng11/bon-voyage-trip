import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import DailyPlans from './DailyPlans'

function TripDetails() {
  let navigate = useNavigate()
  const params = useParams()
  const [trip, setTrip] = useState({daily_plans: []})

  useEffect(() => {
    fetch(`/trips/${params.trip_id}`)
      .then(res => res.json())
      .then(data => setTrip(data))
      .catch(console.error)
  }, []);

  function deleteTrip() {
    if (window.confirm("Are you sure?")) {
      fetch(`/trips/${params.trip_id}`, {
        method: "DELETE"
      })
      .then(res => res.json())
      .then(data => {
        alert("Trip deleted")
        navigate("/")
      })
      .catch(console.error)
    }
  }

  let i = 0
  const showDailyPlans = trip.daily_plans.map(plan => {
    i += 1
    return <DailyPlans key={plan.id} dailyPlan={plan} index={i}/>
  })

  return (
    <div>
      <h1>{trip.title}</h1>
      <div>{moment(trip.start_date).calendar()} - {moment(trip.end_date).calendar()}</div>
      <button onClick={deleteTrip}>Delete Trip</button>
      <div className="grid grid-cols-4 gap-4 overflow-auto">
        {showDailyPlans}
      </div>
    </div>
  );
}

export default TripDetails;