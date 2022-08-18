import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import World from './World';

function App() {
  const [countryName, setCountryName] = useState("")
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    fetch("/hello")
      .then((r) => r.json())
      .then((data) => setCount(data.count));
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/testing" element={
            <div>
              <div>
                <h1>Pick a country you want to visit: {countryName}</h1>  
              </div>
              <World setCountryName={setCountryName}/>
            </div>
          }></Route>
          <Route path="/" element={<h1>Page Count: {count}</h1>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
