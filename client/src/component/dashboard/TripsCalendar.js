import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import { useEffect, useState } from 'react'


function TripsCalender() {
  const [trips, setTrips] = useState([])

  useEffect(() => {
    setTrips([{
      title: "asgasdfjhaskhgjaln;bnoaihesljr;ioalsnvna;heohjfojainiv e;oah;oesihrfop;jaovnmo;iar hpoiasujf;oijase;ogf h;oasehfo;i ",
      start: new Date(2022,7,2),
      end: new Date(2022,7,7)
    }])
  }, []);

  const locales = {
    'en-US': enUS,
  }
  
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  })

  function addTrip() {

  }

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={trips}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: 50}}
      />
    </div>
  );
}

export default TripsCalender;