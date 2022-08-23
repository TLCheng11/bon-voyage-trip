import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import World from '../Worlds/World'
import CountriesSelectionBox from './CountriesSelectionBox';

function SelectLocation({selectLocationProps}) {
  let navigate = useNavigate()
  const {setNextCountry, setNextCity} = selectLocationProps
  const [screenProtect, setScreenProtect] = useState(true)
  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")

  // please only uncomment when testing the selection or on production
  // useEffect(() => {
  //   if (currentUser.id && nextCity) {
  //     fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${country.split(" ").join("+")}+${city.split(" ").join("+")}&key=${process.env. REACT_APP_GOOGLE_MAP_API_KEY}`)
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data.results[0].geometry.location)
  //       setCoordinates(data.results[0].geometry.location)
  //     })
  //   }
  // }, [city])

  useEffect(() => {
    if (screenProtect) {
      const id = setTimeout(() => {
        setScreenProtect(false)
      }, 2000)

      return (() => clearInterval(id))
    }
  }, [screenProtect]);

  useEffect(() => {
    setScreenProtect(true)
  }, [country]);

  function handleConfirmDestination(){
    setNextCountry(country)
    setNextCity(city)
    navigate("/")
  }

  return (
    <div className='h-full'>
      {
        screenProtect ? <div className='fixed h-screen w-screen z-50 opacity-5 bg-color-white'></div> : null
      }
      <div>
        <h1 className="text-white text-center text-3xl font-bold underline mb-2">Pick a country you want to visit: {country} {city ? ` => City: ${city}` : null}</h1>
        <CountriesSelectionBox selectLocationProps={selectLocationProps} country={country} setCountry={setCountry} city={city} setCity={setCity} />
        <div className='flex justify-center w-full'>
          <button className='text-white' onClick={handleConfirmDestination}>Confirm</button>
        </div>
      </div>
      <div className='fixed top-0 -z-20'>
        <World country={country} setCountry={setCountry} city={city} setCity={setCity}/>
      </div>
    </div>
  );
}

export default SelectLocation;