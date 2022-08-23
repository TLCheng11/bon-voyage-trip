import TimePicker from 'react-time-picker';

function RestaurantForm({
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  name,
  setName,
  location,
  setLocation
}) {

  return (
    <div>
      <div>
        <div>
          <p>
            Restaurant Name:
            <input value={name} onChange={e => setName(e.target.value)} />
          </p>
          <p>
            Address:
            <input value={location} onChange={e => setLocation(e.target.value)} />
          </p>
        </div>
        <div className="flex justify-evenly">
          <div>
            <p>Reserved at:</p>
            <TimePicker value={startTime} onChange={setStartTime}/>
          </div>
          <div>
            <p>Est. Finish at:</p>
            <TimePicker value={endTime} onChange={setEndTime}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantForm;