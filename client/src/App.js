import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import World from './component/Worlds/World';
import LoginScreen from './component/loginScreen/LoginScreen';

function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [countryName, setCountryName] = useState("")

  const loginScreenProps = {
    currentUser,
    setCurrentUser
  }

  useEffect(() => {
    fetch("/auth")
    .then(res => {
      if (res.ok) {
        res.json().then(user => setCurrentUser(user))
      }
    })
  }, []);

  if (!currentUser.id) return <LoginScreen loginScreenProps={loginScreenProps} />

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/testing" element={
            <div>
              <div>
                <h1 className="text-3xl font-bold underline">Pick a country you want to visit: {countryName}</h1>  
              </div>
              <World setCountryName={setCountryName}/>
            </div>
          }></Route>
          <Route path="/" element={
            <div>
              <div>Dashboard</div>
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
