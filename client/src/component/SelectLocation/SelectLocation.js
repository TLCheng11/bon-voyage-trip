import { useEffect, useState } from 'react';
import World from '../Worlds/World'
import CountriesSelectionBox from './CountriesSelectionBox';

function SelectLocation({selectLocationProps}) {
  const {nextCountry, nextCity} = selectLocationProps

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold underline">Pick a country you want to visit: {nextCountry} {nextCity ? ` => ${nextCity}` : null}</h1>
        <CountriesSelectionBox selectLocationProps={selectLocationProps}/>
      </div>
      <World selectLocationProps={selectLocationProps}/>
    </div>
  );
}

export default SelectLocation;