import TimePicker from 'react-time-picker';

function SightSeeingForm({
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  name,
  setName,
  location,
  setLocation,
  description,
  setDescription
}) {

  return (
    <div>
      <div>
        <div>
          <p>
            Place Name:
            <input value={name} onChange={e => setName(e.target.value)} />
          </p>
          <p>
            Address:
            <input value={location} onChange={e => setLocation(e.target.value)} />
          </p>
        </div>
        <div className="flex justify-evenly">
          <div>
            <p>Start at:</p>
            <TimePicker value={startTime} onChange={setStartTime}/>
          </div>
          <div>
            <p>End at:</p>
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

export default SightSeeingForm;