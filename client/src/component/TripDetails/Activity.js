import { useEffect, useState } from "react";
import moment from "moment";

function Activity({activity, setActivities, setAction, setInfo, setAddingActivity, setDeletActivity}) {
  const [type, setType] = useState("")

  const iconUrl = {
    sight_spot: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
    restaurant: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
    transportation_plan: "https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-transportation-vacation-planning-resort-flaticons-flat-flat-icons-2.png",
    hotel_booking: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
  }

  // console.log(activity)

  useEffect(() => {
    if (activity.sight_spot) {
      setType("sight_spot")
    } else if (activity.restaurant) {
      setType("restaurant")
    } else if (activity.transportation_plan) {
      setType("transportation_plan")
    } else if (activity.hotel_booking) {
      setType("hotel_booking")
    }
  }, []);

  function deleteActivity() {
    fetch(`/activities/${activity.id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(() => {
        // setActivities(activities => activities.filter(act => act.id != activity.id))
        setDeletActivity(state => !state)
      })
  }

  return (
    <div className="flex border rounded-lg m-1 p-1">
      <div className="flex items-center h-20 w-20">
        <img className="h-15 w-15" src={iconUrl[type]}/>
      </div>
      <div className="flex w-full mx-2 justify-between">
        <div>
          {
            type === "sight_spot" ? (
              <div>
                <p>{moment(activity.start_time).format("hh:mm A")} - {moment(activity.end_time).format("hh:mm A")}</p>
                <p>{activity.sight_spot.name}</p>
                <p>{activity.sight_spot.location}</p>
                {activity.sight_spot.rating > 0 ? <p>Rating: {activity.sight_spot.rating}</p> : null}
              </div>
            ) : (null)
          }
          {
            type === "restaurant" ? (
              <div>
                <p>{moment(activity.start_time).format("hh:mm A")} - {moment(activity.end_time).format("hh:mm A")}</p>
                <p>{activity.restaurant.name}</p>
                <p>{activity.restaurant.location}</p>
                {activity.restaurant.rating > 0 ? <p>Rating: {activity.restaurant.rating}</p> : null}
              </div>
            ) : (null)
          }
          {
            type === "transportation_plan" ? (
              <div>
                <p>Departing: {moment(activity.start_time).format("hh:mm A")}</p>
                <p>Arriving: {moment(activity.end_time).format("hh:mm A")}</p>
                <p>{activity.transportation_plan.transportation_type}</p>
                <p>{activity.transportation_plan.destination_city} ({activity.transportation_plan.destination_country})</p>
              </div>
            ) : (null)
          }
          {
            type === "hotel_booking" ? (
              <div>
                <p>Check-in: {moment(activity.start_time).format("hh:mm A")}</p>
                <p>Check-out: {moment(activity.end_time).format("hh:mm A")}</p>
                <p>{activity.hotel_booking.name}</p>
                <p>{activity.hotel_booking.location}</p>
                {activity.hotel_booking.rating > 0 ? <p>Rating: {activity.hotel_booking.rating}</p> : null}
                {activity.hotel_booking.price > 0 ? <p>Price: ${activity.hotel_booking.price} USD</p> : null}
              </div>
            ) : (null)
          }
        </div>
        <div>
          <img className="h-7 w-7 cursor-pointer" src="https://img.icons8.com/ios-filled/100/000000/edit-calendar.png" alt="edit"
            onClick={() => {
              setAction("edit")
              setInfo({...activity, type: type})
              setAddingActivity(true)
            }}
          />
          <img className="h-7 w-7 cursor-pointer" src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-garbage-cleaning-flaticons-lineal-color-flat-icons.png" 
            alt="delete" 
            onClick={deleteActivity}
          />
        </div>
      </div>
    </div>
  );
}

export default Activity;