import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

function TripDetails() {
  let navigate = useNavigate()
  const params = useParams()
  const [trip, setTrip] = useState({daily_plans: []})

  useEffect(() => {
    fetch(`/trips/${params.id}`)
      .then(res => res.json())
      .then(data => setTrip(data))
      .catch(console.error)
  }, []);

  function deleteTrip() {
    if (window.confirm("Are you sure?")) {
      fetch(`/trips/${params.id}`, {
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

  const showDailyPlans = trip.daily_plans.forEach(plan => console.log(plan))

  return (
    <div>
      <h1>{trip.title}</h1>
      <div>{moment(trip.start_date).calendar()} - {moment(trip.end_date).calendar()}</div>
      <button onClick={deleteTrip}>Delete Trip</button>
    </div>
  );
}

export default TripDetails;