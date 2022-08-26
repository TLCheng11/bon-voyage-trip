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

  // for geting trips data
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
            end: moment(trip.end_date).toDate()
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
    if (!moment(newTrip.start).subtract(1, "day").isBefore(moment(newTrip.end))) {
      alert("End day must be equal or later then Start day!")
    } else {
      let currentDay = moment(newTrip.start)
      const dayRange = [currentDay.toDate()]
      while (currentDay.isBefore(moment(newTrip.end).add(1, "day"))) {
        currentDay = currentDay.add(1, "day")
        dayRange.push(currentDay.toDate())
      }
      // console.log(dayRange)
      // console.log(dayRange[dayRange.length -2])
      // console.log(dayRange.length)

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
                title: newTrip.title,
                start_date: dayRange[0],
                end_date: dayRange[dayRange.length - 2],
                day_range: dayRange,
                day_count: dayRange.length - 1,
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
                end: moment(data.end_date).toDate()
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
      <div className='flex p-2 justify-center items-center'>
        <input type="text"
          placeholder=""
          required
          value={newTrip.title}
          onChange={e => setNewTrip({...newTrip, title: e.target.value})}
        />
        <div className='flex'>
          <DatePicker
            className='mx-2'
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
        <div className='rounded flex mx-10'>
          <NavLink to="select-location">
            <button
                type="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >{nextCity ? `Destination: ${nextCity} (${nextCountry})` : "Select Destination"}</button>
          </NavLink>
        </div>
        <button 
        type="button"
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
        className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        onClick={addTrip}>Add Trip</button>
      </div>
        <Calendar
          style={{ height: 600, margin: 25, padding: 10, opacity: 0.85, background: "linear-gradient(to right, #ddd6f3, #faaca8)"}}
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