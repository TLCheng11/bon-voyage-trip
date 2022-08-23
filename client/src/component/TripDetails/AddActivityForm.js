
import { useState } from 'react';
import TranspotationForm from './TranspotationForm';

function AddActivityForm() {
  const [startTime, setStartTime] = useState("09:00")
  const [endTime, setEndTime] = useState("10:00")
  const [type, setType] = useState("")
  // states for transpotation
  const [transpotationType, setTranspotationType] = useState("air")
  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")
  const [departureStation, setDepartureStation] = useState("")
  const [destinationStation, setDestinationStation] = useState("")

  let showForm
  switch (type) {
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
                />
      break;
  
    default:
      break;
  }
  
  return (
    <div className="fixed h-full w-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="min-h-96 w-96 border rounded-xl bg-white">
        {/* for close button */}
        <div className="flex items-baseline justify-between">
          <p className="ml-2">Add activity:</p>
          <button className="px-2 py-1 text-red-700 hover:text-red-400">X</button>
        </div>
        {/* for edit form */}
        <div className="p-2">
          <div className="mx-3 my-2">
            <select value={type} onChange={e => setType(e.target.value)}>
              <option value="">Type:</option>
              <option value="transpotation_plan">Travel</option>
              <option value="hotel_booking">Lodging</option>
              <option value="restaurant">Restaurant</option>
              <option value="sight_spot">Sight Seeing</option>
              <option value="other">Other</option>
            </select>
          </div>

          {showForm}

        </div>
        <div className="flex justify-center">
          <button>COMFIRM PLAN</button>
        </div>
      </div>
    </div>
  );
}

export default AddActivityForm;