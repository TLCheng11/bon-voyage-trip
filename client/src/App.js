import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginScreen from './component/loginScreen/LoginScreen';
import SelectLocation from './component/SelectLocation/SelectLocation';
import Testing from './Testing';


function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [lastCounty, setLastCounty] = useState("")
  const [lastCity, setLastCity] = useState ("")
  const [nextCounty, setNextCountry] = useState("")
  const [nextCity, setNextCity] = useState("New York");
  const [coordinates, setCoordinates] = useState({lat: 40.7127753, lng: -74.0059728})
  const [countryName, setCountryName] = useState("")

  // all props package
  const loginScreenProps = {
    currentUser,
    setCurrentUser
  }
  const selectLocationProps = {
    countryName,
    setCountryName,
    setNextCountry,
    setNextCity
  }

  useEffect(() => {
    fetch("/auth")
    .then(res => {
      if (res.ok) {
        res.json().then(user => {
          // console.log(user)
          setCurrentUser(user)
          setLastCounty(user.home_country)
          setLastCity(user.home_city)
        })
      }
    })
  }, [])

  // please only uncomment when testing the selection or on production
  // useEffect(() => {
  //   fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${nextCity.split(" ").join("+")}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`)
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log(data.results[0].geometry.location)
  //     setCoordinates(data.results[0].geometry.location)
  //   })
  // }, [nextCity])

  if (!currentUser.id) return <LoginScreen loginScreenProps={loginScreenProps} />

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/select-location" element={<SelectLocation selectLocationProps={selectLocationProps} />}></Route>
          <Route path="/" exact element={
            // this is only for testing, please add a component for dashboard
            <Testing currentUser={currentUser} setCurrentUser={setCurrentUser} coordinates={coordinates}/>
          }></Route>
          <Route path="*" element={<div className="text-6xl">Page Not Found</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
