import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import DailyPlans from './DailyPlans'

function TripDetails() {
  let navigate = useNavigate()
  const params = useParams()
  const [trip, setTrip] = useState({daily_plans: []})
  const [firstTravel, setFirstTravel] = useState(true)
  const [updating, setUpdating] = useState(true)

  console.log(trip)

  useEffect(() => {
    fetch(`/trips/${params.trip_id}`)
      .then(res => res.json())
      .then(data => setTrip(data))
      .catch(console.error)
  }, [updating]);

  useEffect(() => {
    if (trip.daily_plans.length > 0 && firstTravel) {
      if (!(trip.daily_plans.sort((a,b) => (a.day_index - b.day_index)))[0].transportation_plan) {
          alert("Please set up your first travel plan for Day 1")
          setFirstTravel(false)
      }
    }
  }, [trip]);


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

  function addDay() {
    fetch(`/trips/${trip.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        end_date: moment(trip.end_date).add(1, "days"),
        type: "add"
      })
    })
    .then(res => res.json())
    .then(() => setUpdating(state => !state))
  }

  function deleteDay() {
    if (moment(trip.start_date) < moment(trip.end_date)) {
      fetch(`/trips/${trip.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          end_date: moment(trip.end_date).subtract(1, "days"),
          type: "delete"
        })
      })
      .then(res => res.json())
      .then(() => setUpdating(state => !state))
    }
  }

  const showDailyPlans = trip.daily_plans.sort((a,b) => a.day_index - b.day_index).map(plan => {
    return <DailyPlans key={plan.id} dailyPlan={plan} index={plan.day_index}/>
  })

  return (
    <div>
      <h1>{trip.title}</h1>
      <div>{moment(trip.start_date).format("MM-DD-YYYY")} - {moment(trip.end_date).format("MM-DD-YYYY")}</div>
      <button onClick={deleteTrip}>Delete Trip</button>
      <button onClick={addDay}>Add Day</button>
      <button onClick={deleteDay}>Delete Day</button>
      <div className="grid grid-cols-4 gap-4 overflow-y-auto">
        {showDailyPlans}
      </div>
    </div>
  );
}

export default TripDetails;