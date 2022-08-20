import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import MapHolder from './component/Maps/MapHolder';

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
        
      <MapHolder coordinates={coordinates} />
      
    </div>
  );
}

export default Testing;