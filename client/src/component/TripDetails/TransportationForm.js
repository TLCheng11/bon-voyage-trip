import TimePicker from 'react-time-picker';
import CountriesSelectionBox from '../SelectLocation/CountriesSelectionBox'

function TransportationForm({
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  transportationType, 
  setTransportationType,
  company,
  setCompany,
  country, 
  setCountry, 
  city, 
  setCity,
  departureStation,
  setDepartureStation,
  destinationStation,
  setDestinationStation,
  description,
  setDescription
}) {
  return (
    <div>
      <div>
        <div className="flex justify-evenly">
          <div>
            <p>Depart at:</p>
            <TimePicker value={startTime} onChange={setStartTime}/>
          </div>
          <div>
            <p>Arrive at:</p>
            <TimePicker value={endTime} onChange={setEndTime}/>
          </div>
        </div>
        <div className='m-3'>
          <select value={transportationType} onChange={e => setTransportationType(e.target.value)}>
            <option value="Air">Air</option>
            <option value="Train">Train</option>
            <option value="Bus">Bus</option>
            <option value="Ship">Ship</option>
            <option value="Walking">On foot</option>
          </select>
          {
            transportationType !== "Walking" ? <input className='mx-3 border w-2/3 rounded-md' placeholder="Provider Company" value={company} onChange={e => setCompany(e.target.value)} /> : null
          }
        </div>
      </div>
      <div>
        <p>Destination:</p>
        <div className="scale-90">
          <CountriesSelectionBox country={country} setCountry={setCountry} city={city} setCity={setCity} />
        </div>
      </div>
        {
          transportationType === "Air" ? (
            <div>
              <p>Airport: </p>
              <div className='mx-3'>
                <p>
                  From: 
                  <input className='border w-full rounded-md' value={departureStation} onChange={e => setDepartureStation(e.target.value)} placeholder="address"/>
                </p>
                <p>
                  To:
                  <input className='border w-full rounded-md' value={destinationStation} onChange={e => setDestinationStation(e.target.value)} placeholder="address"/>
                </p>
              </div>
            </div>
          ) : (null)
        }
        {
          transportationType === "Train" || transportationType === "Bus" ? (
            <div>
              <p>Station: </p>
              <p>
                From: 
                <input className='border w-full rounded-md' value={departureStation} onChange={e => setDepartureStation(e.target.value)} placeholder="address"/>
              </p>
              <p>
                To:
                <input className='border w-full rounded-md' value={destinationStation} onChange={e => setDestinationStation(e.target.value)} placeholder="address"/>
              </p>
            </div>
          ) : (null)
        }
        {
          transportationType === "Ship" ? (
            <div>
              <p>Seaport: </p>
              <p>
                From: 
                <input className='border w-full rounded-md' value={departureStation} onChange={e => setDepartureStation(e.target.value)} placeholder="address"/>
              </p>
              <p>
                To:
                <input className='border w-full rounded-md' value={destinationStation} onChange={e => setDestinationStation(e.target.value)} placeholder="address"/>
              </p>
            </div>
          ) : (null)
        }
        {
          transportationType === "Walking" ? (
            <div>
              Address:
              <p>
                From: 
                <input className='border w-full rounded-md' value={departureStation} onChange={e => setDepartureStation(e.target.value)} placeholder="address"/>
              </p>
              <p>
                To:
                <input className='border w-full rounded-md' value={destinationStation} onChange={e => setDestinationStation(e.target.value)} placeholder="address"/>
              </p>
            </div>
          ) : (null)
        }
        <div>
          <p>Additional Info:</p>
          <textarea className="mx-3 w-11/12 border" value={description} onChange={e => setDescription(e.target.value)} placeholder="optional" maxLength="250"/>
        </div>
    </div>
  );
}

export default TransportationForm;