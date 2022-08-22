import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import moment from 'moment'

function TripsCalender({dashboardProps}) {
  let navigate = useNavigate()
  const {currentUser, nextCountry, setNextCountry, nextCity, setNextCity} = dashboardProps
  const [trips, setTrips] = useState([])
  const [newTrip, setNewTrip] = useState({
    title: "My Next Trip",
    start: "",
    end: ""
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
    if (newTrip.start > newTrip.end) {
      alert("End day must be equal or later then Start day!")
    } else {
      if (newTrip.title && nextCountry && nextCity) {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${nextCity.split(" ").join("+")}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`)
          .then(res => res.json())
          .then(data => {
            console.log(data)
            fetch("/trips", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                user_id: currentUser.id,
                title: newTrip.title,
                start_date: newTrip.start,
                end_date: newTrip.end,
                country: nextCountry,
                city: nextCity,
                city_lat: data.results[0].geometry.location.lat,
                city_lng: data.results[0].geometry.location.lng
              })
            })
            .then(res => res.json())
            .then(data => {
              console.log(data)
              const returnTrip = {
                title: data.title,
                start: data.start_date,
                end: data.end_date
              }
              setTrips([...trips, returnTrip])
              setNextCountry("")
              setNextCity("")
            })
            .catch(console.error)
          })
          .catch(console.error)
      } else {
        alert("Please enter all the info.")
      }
    }
  }

  function onSelectEvent(){
    navigate("/select-location")
  }

  return (
    <div className=''>
      <div>Add a new trip:</div>
      <div className='flex p-2 justify-center'>
        <input type="text"
          placeholder=""
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
        <div className='flex mx-10'>
          <div className='mx-5'>
            {
              (nextCity) ? (
                `Destination: ${nextCity} (${nextCountry})`
              ) : (
                "Select a location"
              )
            }
          </div>
          <NavLink to="select-location">
            <button>Select Destination</button>
          </NavLink>
        </div>
        <button onClick={addTrip}>Add Trip</button>
      </div>
      <Calendar
        style={{ height: 600, margin: 25, padding: 10, opacity: 0.7, background: "linear-gradient(to right, #ddd6f3, #faaca8)"}}
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