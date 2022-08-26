
import { Data } from '@react-google-maps/api';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HotelForm from './HotelForm';
import RestaurantForm from './RestaurantForm';
import SightSeeingForm from './SightSeeingForm';
import TransportationForm from './TransportationForm';

function AddActivityForm({action, setAction, info, dailyPlan, setAddingActivity, setActivities}) {
  const params = useParams()
  const [startTime, setStartTime] = useState("09:00")
  const [endTime, setEndTime] = useState("10:00")
  const [type, setType] = useState("transportation_plan")
  const [description, setDescription] = useState("")
  // states for transportation
  const [transportationType, setTransportationType] = useState("Air")
  const [company, setCompany] = useState("")
  const [country, setCountry] = useState(dailyPlan.country)
  const [city, setCity] = useState(dailyPlan.city)
  const [departureCountry, setDepartureCountry] = useState(dailyPlan.country)
  const [departureCity, setDepartureCity] = useState(dailyPlan.city)
  const [departureLat, setDepartureLat] = useState(dailyPlan.city_lat)
  const [departureLng, setDepartureLng] = useState(dailyPlan.city_lng)
  const [departureStation, setDepartureStation] = useState("")
  const [destinationStation, setDestinationStation] = useState("")
  // states for hotels and restaurants
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  // states for hotels only
  const [price, setPrice] = useState(0)

  // for info from map
  const [rating, setRating] = useState(0)
  const [lat, setLat] = useState(0)
  const [lng, setLng] = useState(0)

  useEffect(() => {
    if (action === "hotel") {
      setType("hotel_booking")
    }

    if (info.type && action === "fromMap") {
      const types = {
        lodging: "hotel_booking",
        restaurant: "restaurant",
        tourist_attraction: "sight_spot",
        museum: "sight_spot"
      }
      setType(types[info.type])
      setName(info.name)
      setLocation(info.vicinity)
      setRating(info.rating)
      setLat(info.geometry.location.lat)
      setLng(info.geometry.location.lng)
    }

    if (info.type && action === "edit") {
      setType(info.type)
      setStartTime(moment(info.start_time).format("HH:mm"))
      setEndTime(moment(info.end_time).format("HH:mm"))
      setDescription(info.description)

      if (info.sight_spot) {
        setName(info.sight_spot.name)
        setLocation(info.sight_spot.location)
        setRating(info.sight_spot.rating ? info.sight_spot.rating : 0)
        setLat(info.sight_spot.lat ? info.sight_spot.lat : 0)
        setLng(info.sight_spot.lng ? info.sight_spot.lng : 0)
      } else if (info.restaurant) {
        setName(info.restaurant.name)
        setLocation(info.restaurant.location)
        setRating(info.restaurant.rating ? info.restaurant.rating : 0)
        setLat(info.restaurant.lat ? info.restaurant.lat : 0)
        setLng(info.restaurant.lng ? info.restaurant.lng : 0)
      } else if (info.hotel_booking) {
        setName(info.hotel_booking.name)
        setLocation(info.hotel_booking.location)
        setRating(info.hotel_booking.rating ? info.hotel_booking.rating : 0)
        setLat(info.hotel_booking.lat ? info.hotel_booking.lat : 0)
        setLng(info.hotel_booking.lng ? info.hotel_booking.lng : 0)
        setPrice(info.hotel_booking.price ? info.hotel_booking.price : 0)
      } else if (info.transportation_plan) {
        setTransportationType(info.transportation_plan.transportation_type)
        setCompany(info.transportation_plan.company)
        setDepartureCountry(info.transportation_plan.departure_country)
        setDepartureCity(info.transportation_plan.departure_city)
        setDepartureLat(info.transportation_plan.departure_lat)
        setDepartureLng(info.transportation_plan.departure_lng)
        setCountry(info.transportation_plan.destination_country)
        setCity(info.transportation_plan.destination_city)
        setDepartureStation(info.transportation_plan.departure_location)
        setDestinationStation(info.transportation_plan.destination_location)
        setLat(info.transportation_plan.destination_lat)
        setLng(info.transportation_plan.departure_lng)
        setPrice(info.transportation_plan.ticket_price ? info.transportation_plan.ticket_price : 0)
      }
    }

    // console.log(info)
  }, [info]);

  let showForm
  switch (type) {
    case "sight_spot":
      showForm = <SightSeeingForm 
                  startTime={startTime}
                  setStartTime={setStartTime}
                  endTime={endTime}
                  setEndTime={setEndTime}
                  name={name}
                  setName={setName}
                  location={location}
                  setLocation={setLocation}
                  description={description}
                  setDescription={setDescription}
                />
      break;
    case "restaurant":
      showForm = <RestaurantForm 
                  startTime={startTime}
                  setStartTime={setStartTime}
                  endTime={endTime}
                  setEndTime={setEndTime}
                  name={name}
                  setName={setName}
                  location={location}
                  setLocation={setLocation}
                  description={description}
                  setDescription={setDescription}
                />
      break;
    case "transportation_plan":
      showForm = <TransportationForm
                  startTime={startTime}
                  setStartTime={setStartTime}
                  endTime={endTime}
                  setEndTime={setEndTime}
                  transportationType={transportationType} 
                  setTransportationType={setTransportationType}
                  company={company}
                  setCompany={setCompany}
                  country={country} 
                  setCountry={setCountry} 
                  city={city} 
                  setCity={setCity}
                  departureStation={departureStation}
                  setDepartureStation={setDepartureStation}
                  destinationStation={destinationStation}
                  setDestinationStation={setDestinationStation}
                  description={description}
                  setDescription={setDescription}
                />
      break;
    case "hotel_booking":
      showForm = <HotelForm 
                  startTime={startTime}
                  setStartTime={setStartTime}
                  endTime={endTime}
                  setEndTime={setEndTime}
                  name={name}
                  setName={setName}
                  location={location}
                  setLocation={setLocation}
                  price={price}
                  setPrice={setPrice}
                  description={description}
                  setDescription={setDescription}
                />
      break;
    default:
      break;
  }

  function handleConfirmation() {
    let okToProcess = false

    // check if time input is valid
    if (!startTime || !endTime || !moment(startTime, "h:mma").isBefore(moment(endTime, "h:mma"))) {
      alert("Please enter a valid time period!")
    } else {
      // check if required input exist
      switch (type) {
        case "sight_spot":
          if(name && location) {
            okToProcess = true
          } else {
            alert("please enter name and location")
          }
          break;
        case "restaurant":
          if(name && location) {
            okToProcess = true
          } else {
            alert("please enter name and location")
          }
          break;
        case "transportation_plan":
          if(city) {
            okToProcess = true
          } else {
            alert("please enter a destination")
          }
          break;
        case "hotel_booking":
          if(name && location) {
            okToProcess = true
          } else {
            alert("please enter name and location")
          }
          break;
        default:
          break;
      }
    }

    if (okToProcess) {
      let child
      switch (type) {
        case "sight_spot":
          child = {
            name,
            location,
            lat,
            lng,
            image_url: "",
            rating
          }
          break;
        case "restaurant":
          child = {
            name,
            location,
            lat,
            lng,
            image_url: "",
            rating
          }
          break;
        case "transportation_plan":
          child = {
            transportation_type: transportationType,
            company,
            departure_country: departureCountry,
            destination_country: country,
            departure_city: departureCity,
            destination_city: city,
            departure_location: departureStation,
            destination_location: destinationStation,
            departure_lat: departureLat,
            departure_lng: departureLng,
            destination_lat: lat,
            destination_lng: lng,
            departure_time: moment(moment(dailyPlan.start_date).format("MM-DD-YYYY") + " " + startTime),
            arrival_time: moment(moment(dailyPlan.end_date).format("MM-DD-YYYY") + " " + endTime),
            ticket_price: price
          }
          break;
        case "hotel_booking":
          child = {
            name,
            location,
            lat,
            lng,
            image_url: "",
            rating,
            price
          }
          break;
        default:
          break;
        }
        
      const url = action === "edit" ? `/activities/${info.id}` : "/activities"
      const method = action === "edit" ? "PATCH" : "POST"

      if (type === "transportation_plan" && city) {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${country.split(" ").join("+")}+${city.split(" ").join("+")}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`)
            .then(res => res.json())
            .then(data => {
              // console.log(data)
              child.destination_lat = data.results[0].geometry.location.lat
              child.destination_lng = data.results[0].geometry.location.lng
              console.log(child)
              postActivity()
            })
      } else if (location && lat === 0 && lng === 0) {
        // console.log("getting location")
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location.replaceAll(/[\s,.]+/g, "+")}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`)
          .then(res => {
            if (res.ok) {
            res.json().then(data => {
              // console.log(data)
              if (data.status === "OK") {
                // console.log(child)
                child.lat = data.results[0].geometry.location.lat
                child.lng = data.results[0].geometry.location.lng
                postActivity()
              } else {
                alert("Location address not found")
              }
            })
          } else {
            alert("Location address not found")
          }
        })
      } else {
        postActivity()
      }
      
      function postActivity() {
        return fetch(url, {
          method: method,
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({
            type: type,
            daily_plan_id: params.daily_plan_id,
            start_time: moment(moment(dailyPlan.start_date).format("MM-DD-YYYY") + " " + startTime),
            end_time: moment(moment(dailyPlan.end_date).format("MM-DD-YYYY") + " " + endTime),
            city: city,
            city_lat: dailyPlan.city_lat,
            city_lng: dailyPlan.city_lng,
            description: description,
            ...child
          })
        })
          .then(res => res.json())
          .then(data => {
            setAddingActivity(false)
            setAction("new")
            // setActivities(activities => [...activities, data])
          })
      }

    }
  }
  
  return (
    <div className="fixed h-full w-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="min-h-96 w-96 border border-solid rounded-xl bg-white ">
        {/* for close button */}
        <div className="flex items-baseline justify-between">
          <p className="ml-2">{action === "new" || action === "fromMap" || action === "hotel" ? "Add" : "Edit"} activity:</p>
          <button className="px-2 py-1 text-red-700 hover:text-red-400" onClick={() => 
            {
              setAddingActivity(false)
              setAction("new")
            }
          }>X</button>
        </div>
        {/* for edit form */}
        <div className="p-2">
          {
            action === "new" ? (
              <div className="flex mx-3 my-2">
                <p>Type:</p>
                <select value={type} onChange={e => setType(e.target.value)}>
                  <option value="transportation_plan">Travel</option>
                  <option value="sight_spot">Sight Seeing</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="hotel_booking">Lodging</option>
                </select>
              </div>
            ) : (null)
          }
          {showForm}
        </div>
        <div className="flex justify-center">
          <button onClick={handleConfirmation}>{action === "edit" ? "EDIT" : "COMFIRM PLAN"}</button>
        </div>
      </div>
    </div>
  );
}

export default AddActivityForm;