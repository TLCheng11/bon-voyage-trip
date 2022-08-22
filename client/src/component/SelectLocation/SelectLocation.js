import { set } from 'date-fns';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import World from '../Worlds/World'
import CountriesSelectionBox from './CountriesSelectionBox';

function SelectLocation({selectLocationProps}) {
  let navigate = useNavigate()
  const {nextCountry, setNextCity} = selectLocationProps
  const [screenProtect, setScreenProtect] = useState(true)
  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")

  // please only uncomment when testing the selection or on production
  // useEffect(() => {
  //   if (currentUser.id && nextCity) {
  //     fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${nextCity.split(" ").join("+")}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`)
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data.results[0].geometry.location)
  //       setCoordinates(data.results[0].geometry.location)
  //     })
  //   }
  // }, [nextCity])

  useEffect(() => {
    if (screenProtect) {
      const id = setTimeout(() => {
        setScreenProtect(false)
      }, 2500)

      return (() => clearInterval(id))
    }
  }, [screenProtect]);

  useEffect(() => {
    setScreenProtect(true)
  }, [country]);

  return (
    <div>
      {
        screenProtect ? <div className='fixed h-screen w-screen z-50 opacity-5 bg-color-white'></div> : null
      }
      <div>
        <button onClick={() => navigate("/")}>Back to Dashboard</button>
      </div>
      <div>
        <h1 className="text-3xl font-bold underline">Pick a country you want to visit: {country} {city ? ` => City: ${city}` : null}</h1>
        <CountriesSelectionBox selectLocationProps={selectLocationProps} country={country} setCountry={setCountry} city={city} setCity={setCity} />
      </div>
      <World country={country} setCountry={setCountry} city={city} setCity={setCity}/>
    </div>
  );
}

export default SelectLocation;