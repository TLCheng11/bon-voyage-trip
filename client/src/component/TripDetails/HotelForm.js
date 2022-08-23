import TimePicker from 'react-time-picker';

function HotelForm({
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  name,
  setName,
  location,
  setLocation,
  price,
  setPrice,
  description,
  setDescription
}) {

  function validate(e) {
    let t = e.target.value;
    t = (t.indexOf(".") >= 0) ? (t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 3)) : t;
    setPrice(t)
  }

  return (
    <div>
      <div>
        <div>
          <p>
            Hotel Name:
            <input value={name} onChange={e => setName(e.target.value)} />
          </p>
          <p>
            Address:
            <input value={location} onChange={e => setLocation(e.target.value)} />
          </p>
          <p>
            Cost per day: $
            <input type="number" min="0.00" step="any" value={price} onChange={e => validate(e)} />
            USD
          </p>
        </div>
        <div className="flex justify-evenly">
          <div>
            <p>Check in at:</p>
            <TimePicker value={startTime} onChange={setStartTime}/>
          </div>
          <div>
            <p>Check out at:</p>
            <TimePicker value={endTime} onChange={setEndTime}/>
          </div>
        </div>
        <div>
          <p>Additional Info:</p>
          <textarea className="w-full" value={description} onChange={e => setDescription(e.target.value)}/>
        </div>
      </div>
    </div>
  );
}

export default HotelForm;