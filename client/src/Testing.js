import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Map from './component/Maps/Map';

function Testing({currentUser, setCurrentUser, coordinates}) {
  
  return (
    <div>
      <div>Dashboard</div>
      <div>hi {currentUser.username}</div>
      <button onClick={() => {
        fetch("/logout", {
          method: "POST"
        })
          .then(res => res.json())
          .then(console.log)
        setCurrentUser({})
      }}>Logout</button>
      <div>
        <NavLink to="select-location">
          <button>To select location page</button>
        </NavLink>
      </div>
        
      <Map coordinates={coordinates}/>
      
    </div>
  );
}

export default Testing;