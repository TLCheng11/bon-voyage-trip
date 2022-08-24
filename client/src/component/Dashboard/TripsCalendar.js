import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import moment from 'moment'

function TripsCalender({dashboardProps}) {
  let navigate = useNavigate()
  const {currentUser, nextCountry, setNextCountry, nextCity, setNextCity, newTrip, setNewTrip} = dashboardProps
  const [trips, setTrips] = useState([])

  // for test data
  useEffect(() => {
    fetch("/trips")
      .then(res => res.json())
      .then(data => {
        const loadTrips = []
        data.forEach(trip => {
          const loadTrip ={
            id: trip.id,
            title: trip.title,
            start: moment(trip.start_date).toDate(),
            end: moment(trip.end_date).add(1, "days").toDate()
          }
          loadTrips.push(loadTrip)
          // console.log(moment(trip.end_date).calendar())
          // console.log(moment(trip.end_date).add(1, "days").calendar())
        })
        setTrips(loadTrips)
      })
      .catch(console.error)
  }, []);
  
  const localizer = momentLocalizer(moment)

  function addTrip() {
    if (newTrip.start > newTrip.end) {
      alert("End day must be equal or later then Start day!")
    } else {
      if (newTrip.title && newTrip.start && newTrip.end && nextCountry && nextCity) {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${nextCountry.split(" ").join("+")}+${nextCity.split(" ").join("+")}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`)
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
                title: `${newTrip.title}: ${nextCity} (${nextCountry})`,
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
                id: data.id,
                title: data.title,
                start: moment(data.start_date).toDate(),
                end: moment(data.end_date).add(1, "days").toDate()
              }
              setTrips([...trips, returnTrip])
              setNextCountry("")
              setNextCity("")
              setNewTrip({
                id: 0,
                title: "My Next Trip",
                start: new Date(),
                end: ""
              })
            })
            .catch(console.error)
          })
          .catch(console.error)
      } else {
        alert("Please enter all the info.")
      }
    }
  }

  function onSelectEvent(e){
    navigate(`/trip-details/${e.id}`)
  }

  return (
    <div className=''>
      <div className= "dboardtext2">Add a new trip:</div>
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
          <NavLink to="select-location">
            <button
                type="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >{nextCity ? `Destination: ${nextCity} (${nextCountry})` : "Select Destination"}</button>
          </NavLink>
        </div>
        <button 
        type="button"
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
        class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        onClick={addTrip}>Add Trip</button>
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