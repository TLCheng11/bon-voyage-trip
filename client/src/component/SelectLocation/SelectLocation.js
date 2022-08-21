import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import World from '../Worlds/World'
import CountriesSelectionBox from './CountriesSelectionBox';

function SelectLocation({selectLocationProps}) {
  let navigate = useNavigate()
  const {nextCountry, nextCity, setNextCity} = selectLocationProps

  useEffect(() => {
    setNextCity("")
  }, [nextCountry]);

  return (
    <div>
      <div>
        <button onClick={() => navigate("/")}>Back to Dashboard</button>
      </div>
      <div>
        <h1 className="text-3xl font-bold underline">Pick a country you want to visit: {nextCountry} {nextCity ? ` => City: ${nextCity}` : null}</h1>
        <CountriesSelectionBox selectLocationProps={selectLocationProps}/>
      </div>
      <World selectLocationProps={selectLocationProps}/>
    </div>
  );
}

export default SelectLocation;