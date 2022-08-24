
import { Data } from '@react-google-maps/api';
import moment from 'moment';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import HotelForm from './HotelForm';
import RestaurantForm from './RestaurantForm';
import SightSeeingForm from './SightSeeingForm';
import TransportationForm from './TransportationForm';

function AddActivityForm({dailyPlan, setAddingActivity, setActivities}) {
  const params = useParams()
  const [startTime, setStartTime] = useState("09:00")
  const [endTime, setEndTime] = useState("10:00")
  const [type, setType] = useState("sight_spot")
  const [description, setDescription] = useState("")
  // states for transportation
  const [transportationType, setTransportationType] = useState("Air")
  const [company, setCompany] = useState("")
  const [country, setCountry] = useState(dailyPlan.country)
  const [city, setCity] = useState(dailyPlan.city)
  const [departureStation, setDepartureStation] = useState("")
  const [destinationStation, setDestinationStation] = useState("")
  // states for hotels and restaurants
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  // states for hotels only
  const [price, setPrice] = useState("")

  console.log(city)

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
            lat: 0,
            lng: 0,
            image_url: "",
            rating: 0
          }
          break;
        case "restaurant":
          child = {
            name,
            location,
            lat: 0,
            lng: 0,
            image_url: "",
            rating: 0
          }
          break;
        case "transportation_plan":
          child = {
            transportation_type: transportationType,
            company,
            departure_country: dailyPlan.country,
            destination_country: country,
            departure_city: dailyPlan.city,
            destination_city: city,
            departure_location: departureStation,
            destination_location: destinationStation,
            departure_lat: dailyPlan.city_lat,
            departure_lng: dailyPlan.city_lng,
            destination_lat: 0,
            destination_lng: 0,
            departure_time: moment(moment(dailyPlan.start_date).format("MM-DD-YYYY") + " " + startTime),
            arrival_time: moment(moment(dailyPlan.end_date).format("MM-DD-YYYY") + " " + endTime),
            ticket_price: 0
          }
          break;
        case "hotel_booking":
          child = {
            name,
            location,
            lat: 0,
            lng: 0,
            image_url: "",
            rating: 0,
            price
          }
          break;
        default:
          break;
      }
      
      if (type === "transportation_plan" && city) {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${country.split(" ").join("+")}+${city.split(" ").join("+")}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`)
            .then(res => res.json())
            .then(data => {
              console.log(data)
              child.destination_lat = data.results[0].geometry.location.lat
              child.destination_lng = data.results[0].geometry.location.lng
              console.log(child)
              postActivity()
            })
      } else (
        postActivity()
      )
      
      function postActivity() {
        return fetch(`/activities`, {
          method: "POST",
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
            console.log("posting")
            setAddingActivity(false)
            setActivities(activities => [...activities, data])
          })
      }

    }
  }
  
  return (
    <div className="fixed h-full w-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="min-h-96 w-96 border rounded-xl bg-white">
        {/* for close button */}
        <div className="flex items-baseline justify-between">
          <p className="ml-2">Add activity:</p>
          <button className="px-2 py-1 text-red-700 hover:text-red-400" onClick={() => setAddingActivity(false)}>X</button>
        </div>
        {/* for edit form */}
        <div className="p-2">
          <div className="flex mx-3 my-2">
            <p>Type:</p>
            <select value={type} onChange={e => setType(e.target.value)}>
              <option value="sight_spot">Sight Seeing</option>
              <option value="restaurant">Restaurant</option>
              <option value="transportation_plan">Travel</option>
              <option value="hotel_booking">Lodging</option>
            </select>
          </div>
          {showForm}
        </div>
        <div className="flex justify-center">
          <button onClick={handleConfirmation}>COMFIRM PLAN</button>
        </div>
      </div>
    </div>
  );
}

export default AddActivityForm;