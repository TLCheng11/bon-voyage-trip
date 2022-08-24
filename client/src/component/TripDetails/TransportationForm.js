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
        <select value={transportationType} onChange={e => setTransportationType(e.target.value)}>
          <option value="Air">Air</option>
          <option value="Train">Train</option>
          <option value="Bus">Bus</option>
          <option value="Ship">Ship</option>
          <option value="Walking">On foot</option>
        </select>
        {
          transportationType !== "Walking" ? <input placeholder="Provider Company" value={company} onChange={e => setCompany(e.target.value)} /> : null
        }
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
              <p>
                From: 
                <input value={departureStation} onChange={e => setDepartureStation(e.target.value)} placeholder="address"/>
              </p>
              <p>
                To:
                <input value={destinationStation} onChange={e => setDestinationStation(e.target.value)} placeholder="address"/>
              </p>
            </div>
          ) : (null)
        }
        {
          transportationType === "Train" || transportationType === "Bus" ? (
            <div>
              <p>Station: </p>
              <p>
                From: 
                <input value={departureStation} onChange={e => setDepartureStation(e.target.value)} placeholder="address"/>
              </p>
              <p>
                To:
                <input value={destinationStation} onChange={e => setDestinationStation(e.target.value)} placeholder="address"/>
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
                <input value={departureStation} onChange={e => setDepartureStation(e.target.value)} placeholder="address"/>
              </p>
              <p>
                To:
                <input value={destinationStation} onChange={e => setDestinationStation(e.target.value)} placeholder="address"/>
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
                <input value={departureStation} onChange={e => setDepartureStation(e.target.value)} placeholder="address"/>
              </p>
              <p>
                To:
                <input value={destinationStation} onChange={e => setDestinationStation(e.target.value)} placeholder="address"/>
              </p>
            </div>
          ) : (null)
        }
        <div>
          <p>Additional Info:</p>
          <textarea className="w-full" value={description} onChange={e => setDescription(e.target.value)} placeholder="optional" maxLength="250"/>
        </div>
    </div>
  );
}

export default TransportationForm;