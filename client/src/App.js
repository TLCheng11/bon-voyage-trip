import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginScreen from './component/LoginScreen/LoginScreen';
import SelectLocation from './component/SelectLocation/SelectLocation';
import Dashboard from './component/Dashboard/Dashboard';
import MenuBar from './component/Dashboard/MenuBar';
import TripDetails from './component/TripDetails/TripDetails';
import DailyPlanDetails from './component/TripDetails/DailyPlanDetails';


function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [lastCounty, setLastCountry] = useState("")
  const [lastCity, setLastCity] = useState ("")
  const [nextCountry, setNextCountry] = useState("")
  const [nextCity, setNextCity] = useState("");
  const [coordinates, setCoordinates] = useState({})
  const [newTrip, setNewTrip] = useState({
    id: 0,
    title: "My Next Trip",
    start: new Date(),
    end: ""
  })

  // console.log(coordinates)
  // console.log(nextCountry)
  // console.log(nextCity)
  // console.log(usCityOptions)

  // all props package
  const dashboardProps = {
    currentUser,
    nextCountry,
    setNextCountry,
    nextCity,
    setNextCity,
    coordinates,
    newTrip,
    setNewTrip
  }

  const selectLocationProps = {
    nextCountry,
    setNextCountry,
    nextCity,
    setNextCity
  }

  const loginScreenProps = {
    currentUser,
    setCurrentUser,
    selectLocationProps
  }

  // only authorize logged in users
  useEffect(() => {
    fetch("/auth")
    .then(res => {
      if (res.ok) {
        res.json().then(user => {
          // console.log(user)
          setCurrentUser(user)
        })
      }
    })
  }, [])

  useEffect(() => {
    if (currentUser.id) {
      setLastCountry(currentUser.home_country)
      setLastCity(currentUser.home_city)
      setCoordinates({lat: currentUser.home_city_lat, lng: currentUser.home_city_lng})
    } else {
      setLastCountry("")
      setLastCity("")
      setCoordinates({})
    }
  }, [currentUser]);

  if (!currentUser.id) return <LoginScreen loginScreenProps={loginScreenProps} />

  return (
    <BrowserRouter>
      <div className="h-screen">
        <MenuBar setCurrentUser={setCurrentUser} />
        <Routes>
          <Route path="/" exact element={<Dashboard dashboardProps={dashboardProps} />}></Route>
          <Route path="/select-location" element={<SelectLocation selectLocationProps={selectLocationProps} />}></Route>
          <Route path="/trip-details/:trip_id" element={<TripDetails />} ></Route>
          <Route path="/trip-details/:trip_id/:day/:daily_plan_id" element={<DailyPlanDetails />} ></Route>
          <Route path="*" element={<div className="text-6xl">Page Not Found</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
