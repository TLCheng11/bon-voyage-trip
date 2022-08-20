import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginScreen from './component/loginScreen/LoginScreen';
import SelectLocation from './component/SelectLocation/SelectLocation';

function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [lastCounty, setLastCounty] = useState("")
  const [lastCity, setLastCity] = useState ("")
  const [nextCounty, setNextCountry] = useState("")
  const [nextCity, setNextCity] = useState("");
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

  // console.log(nextCounty)
  // console.log(nextCity)

  useEffect(() => {
    fetch("/auth")
    .then(res => {
      if (res.ok) {
        res.json().then(user => {
          console.log(user)
          setCurrentUser(user)
          setLastCounty(user.home_country)
          setLastCity(user.home_city)
        })
      }
    })
  }, []);

  if (!currentUser.id) return <LoginScreen loginScreenProps={loginScreenProps} />

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/testing" element={<SelectLocation selectLocationProps={selectLocationProps} />}></Route>
          <Route path="/" exact element={
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
            </div>
          }></Route>
          <Route path="*" element={<div className="text-6xl">Page Not Found</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
