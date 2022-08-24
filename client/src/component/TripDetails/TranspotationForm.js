import TimePicker from 'react-time-picker';
import CountriesSelectionBox from '../SelectLocation/CountriesSelectionBox'

function TranspotationForm({
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  transpotationType, 
  setTranspotationType,
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
        <select value={transpotationType} onChange={e => setTranspotationType(e.target.value)}>
          <option value="air">Air</option>
          <option value="train">Train</option>
          <option value="bus">Bus</option>
          <option value="ship">Ship</option>
          <option value="foot">On foot</option>
        </select>
        {
          transpotationType !== "foot" ? <input placeholder="Provider Company" value={company} onChange={e => setCompany(e.target.value)} /> : null
        }
      </div>
      <div>
        <p>Destination:</p>
        <div className="scale-90">
          <CountriesSelectionBox country={country} setCountry={setCountry} city={city} setCity={setCity} />
        </div>
      </div>
        {
          transpotationType === "air" ? (
            <div>
              <p>Airport: </p>
              <p>
                From: 
                <input value={departureStation} onChange={e => setDepartureStation(e.target.value)} placeholder="address"/>
              </p>
              <p>
                To:
                <input value={destinationStation} onChange={e => setDestinationStation(e.target.value)} placeholder="address required"/>
              </p>
            </div>
          ) : (null)
        }
        {
          transpotationType === "train" || transpotationType === "bus" ? (
            <div>
              <p>Station: </p>
              <p>
                From: 
                <input value={departureStation} onChange={e => setDepartureStation(e.target.value)} placeholder="address"/>
              </p>
              <p>
                To:
                <input value={destinationStation} onChange={e => setDestinationStation(e.target.value)} placeholder="address required"/>
              </p>
            </div>
          ) : (null)
        }
        {
          transpotationType === "ship" ? (
            <div>
              <p>Seaport: </p>
              <p>
                From: 
                <input value={departureStation} onChange={e => setDepartureStation(e.target.value)} placeholder="address"/>
              </p>
              <p>
                To:
                <input value={destinationStation} onChange={e => setDestinationStation(e.target.value)} placeholder="address required"/>
              </p>
            </div>
          ) : (null)
        }
        {
          transpotationType === "foot" ? (
            <div>
              Address:
              <p>
                From: 
                <input value={departureStation} onChange={e => setDepartureStation(e.target.value)} placeholder="address"/>
              </p>
              <p>
                To:
                <input value={destinationStation} onChange={e => setDestinationStation(e.target.value)} placeholder="address required"/>
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

export default TranspotationForm;