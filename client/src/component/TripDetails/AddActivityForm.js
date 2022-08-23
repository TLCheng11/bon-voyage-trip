
import moment from 'moment';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import HotelForm from './HotelForm';
import RestaurantForm from './RestaurantForm';
import SightSeeingForm from './SightSeeingForm';
import TranspotationForm from './TranspotationForm';

function AddActivityForm({dailyPlan, setAddingActivity}) {
  const params = useParams()
  const [startTime, setStartTime] = useState("09:00")
  const [endTime, setEndTime] = useState("10:00")
  const [type, setType] = useState("sight_spot")
  const [description, setDescription] = useState("")
  // states for transpotation
  const [transpotationType, setTranspotationType] = useState("air")
  const [country, setCountry] = useState(dailyPlan.country)
  const [city, setCity] = useState(dailyPlan.city)
  const [departureStation, setDepartureStation] = useState("")
  const [destinationStation, setDestinationStation] = useState("")
  // states for hotels and restaurants
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  // states for hotels only
  const [price, setPrice] = useState("")

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
    case "transpotation_plan":
      showForm = <TranspotationForm
                  startTime={startTime}
                  setStartTime={setStartTime}
                  endTime={endTime}
                  setEndTime={setEndTime}
                  transpotationType={transpotationType} 
                  setTranspotationType={setTranspotationType} 
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
    if (!moment(startTime, "h:mma").isBefore(moment(endTime, "h:mma"))) {
      alert("Start time cannot be later then the end time!")
    } else {
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
      
        default:
          break;
      }
  
      fetch(`/activities`, {
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
        .then(console.log)
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
              <option value="transpotation_plan">Travel</option>
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