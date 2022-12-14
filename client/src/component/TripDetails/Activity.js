import { useEffect, useState } from "react";
import moment from "moment";

function Activity({mapHolderRef, activity, setActivities, setAction, setInfo, setAddingActivity, setDeletActivity, setCoordinates, setPoint}) {
  const [lat, setLat] = useState(0)
  const [lng, setLng] = useState(0)
  const [type, setType] = useState("")

  const iconUrl = {
    sight_spot: "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-vacation-vacation-planning-diving-tour-flaticons-lineal-color-flat-icons-2.png",
    restaurant: "https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-restaurant-wayfinding-flaticons-flat-flat-icons.png",
    transportation_plan: "https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-transportation-vacation-planning-resort-flaticons-flat-flat-icons-2.png",
    hotel_booking: "https://img.icons8.com/clouds/100/000000/4-star-hotel.png",
  }

  // console.log(activity[type])

  useEffect(() => {
    if (activity.sight_spot) {
      setType("sight_spot")
      if (activity.sight_spot.lat !== 0 || activity.sight_spot.lng !== 0) {
        setLat(activity.sight_spot.lat)
        setLng(activity.sight_spot.lng)
      }
    } else if (activity.restaurant) {
      setType("restaurant")
      if (activity.restaurant.lat !== 0 || activity.restaurant.lng !== 0) {
        setLat(activity.restaurant.lat)
        setLng(activity.restaurant.lng)
      }
    } else if (activity.transportation_plan) {
      setType("transportation_plan")
      if (activity.transportation_plan.destination_lat !== 0 || activity.transportation_plan.destination_lng !== 0) {
        setLat(activity.transportation_plan.destination_lat)
        setLng(activity.transportation_plan.destination_lng)
      }
    } else if (activity.hotel_booking) {
      setType("hotel_booking")
      if (activity.hotel_booking.lat !== 0 || activity.hotel_booking.lng !== 0) {
        setLat(activity.hotel_booking.lat)
        setLng(activity.hotel_booking.lng)
      }
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
    <div className="bg-[#fecdd3] rounded-xl font-bold text-stone-700">
    <div className="flex border rounded-lg px-2 py-2">
      <div className="flex items-center h-20 w-20">
        <img className="h-15 w-15 bg-white pl-1 bg-transparent" src={iconUrl[type]}/>
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
          {
            lat !== 0 || lng !== 0 ? (
              <img className="h-7 w-7 cursor-pointer"
                src="https://img.icons8.com/external-soft-fill-juicy-fish/60/FAB005/external-location-essentials-soft-fill-soft-fill-juicy-fish.png" 
                alt="locate" 
                onClick={() => {
                  setPoint({type, data: activity[type], iconUrl: iconUrl[type]})
                  setCoordinates({lat, lng})
                  mapHolderRef.current.zoom = 16
                }}
              />
            ) : (null)
          }
          <img className="h-7 w-7 cursor-pointer" src="https://img.icons8.com/ios-filled/100/000000/edit-calendar.png" alt="edit"
            onClick={() => {
              setAction("edit")
              setInfo({...activity, type: type})
              setAddingActivity(true)
            }}
          />
          <img className="h-7 w-7 cursor-pointer" src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-garbage-cleaning-flaticons-lineal-color-flat-icons.png" 
            alt="delete" 
            onClick={() => {
              deleteActivity()
              setPoint({})
            }}
          />
        </div>
      </div>
    </div>
    </div>
  );
}

export default Activity;