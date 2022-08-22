import { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

function TripsCalender() {
  let navigate = useNavigate()
  const [trips, setTrips] = useState([])
  const [newTrip, setNewTrip] = useState({
    title: "My Next Trip",
    start: new Date(),
    end: new Date()
  })

  // for test data
  useEffect(() => {
    setTrips([{
      title: "Test",
      start: new Date(2022,7,3),
      end: new Date(2022,7,7)
    }])
  }, []);
  
  const localizer = momentLocalizer(moment)

  function addTrip() {
    setTrips([...trips, newTrip])
  }

  function onSelectEvent(){
    navigate("/select-location")
  }

  return (
    <div>
      <div className='flex z-50'>
        <input type="text"
          placeholder="My next Trip"
          required
          value={newTrip.title}
          onChange={e => setNewTrip({...newTrip, title: e.target.value})}
        />
        <div className='flex'>
          <DatePicker
            placeholderText="Start Date"
            selected={newTrip.start}
            onChange={start => setNewTrip({...newTrip, start})}
          />
          <DatePicker
            placeholderText="End Date"
            selected={newTrip.end}
            onChange={end => setNewTrip({...newTrip, end})}
          />
        </div>
        <button onClick={addTrip}>Add Trip</button>
      </div>
      <Calendar
        style={{ height: 500, margin: 25, padding: 10, opacity: 0.7}}
        localizer={localizer}
        events={trips}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={onSelectEvent}
      />
    </div>
  );
}

export default TripsCalender;