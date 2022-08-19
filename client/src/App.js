import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import World from './component/Worlds/World';
import LoginPage from './component/loginScreen/LoginPage';

function App() {
  const [countryName, setCountryName] = useState("")

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
          <Route path="/" element={<LoginPage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
