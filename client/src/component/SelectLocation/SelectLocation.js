import { useState } from 'react';
import World from '../Worlds/World'
import CountriesSelectionBox from './CountriesSelectionBox';

function SelectLocation({selectLocationProps}) {
  const [country, setCountry] = useState("")
  const {countryName} = selectLocationProps

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold underline">Pick a country you want to visit: {countryName}</h1>
        <CountriesSelectionBox selectLocationProps={selectLocationProps} country={country} setCountry={setCountry}/>
      </div>
      <World selectLocationProps={selectLocationProps} country={country} setCountry={setCountry}/>
    </div>
  );
}

export default SelectLocation;