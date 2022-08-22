import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginScreen from './component/loginScreen/LoginScreen';
import SelectLocation from './component/SelectLocation/SelectLocation';
import Testing from './Testing';
import Dashboard from './component/dashboard/Dashboard';
import MenuBar from './component/dashboard/MenuBar';


function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [lastCounty, setLastCountry] = useState("")
  const [lastCity, setLastCity] = useState ("")
  const [nextCountry, setNextCountry] = useState("")
  const [nextCity, setNextCity] = useState("");
  const [coordinates, setCoordinates] = useState({})

  console.log(coordinates)
  console.log(nextCountry)
  console.log(nextCity)
  // console.log(usCityOptions)

  // all props package
  const dashboardProps = {
    currentUser,
    nextCountry,
    setNextCountry,
    nextCity,
    setNextCity,
    coordinates
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
      <div>
        <MenuBar setCurrentUser={setCurrentUser} />
        <Routes>
          <Route path="/" exact element={<Dashboard dashboardProps={dashboardProps} />}></Route>
          <Route path="/select-location" element={<SelectLocation selectLocationProps={selectLocationProps} />}></Route>
          <Route path="*" element={<div className="text-6xl">Page Not Found</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
