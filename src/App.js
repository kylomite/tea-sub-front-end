import './App.css';
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import teaTrade from './assets/teaTrade.png';
import Overview from './Overview/Overview';
import Subscription from './Subscription/Subscription';

function App() {
  const navigate = useNavigate();
  let [subData, setSubData] = useState();
  let location = useLocation();

  useEffect(() => {
    fetchAllSubs();
  }, [location]);

  function fetchAllSubs() {
    fetch("http://127.0.0.1:3000/api/v1/subscriptions")
      .then(response => {
        console.log("Received response:", response);
        if (!response.ok) {
          throw new Error(response.status); 
        }  
        return response.json();
      })
      .then(data => {
        console.log("Parsed data:", data);
        setSubData(data); 
      })
      .catch(error => {
        console.error('Fetch operation failed:', error);
      });
  }
  return (
    <section>
      <header>
        <button onClick={() => {navigate(`/`)}} style={{ border: 'none', background: 'none', padding: 0 }}>
          <img className='logo' src={teaTrade} alt='Tea Trade Logo' />
        </button>        
        <h1>T-Trade</h1>
      </header>
      <Routes>
        <Route />
        <Route path="/" element={<Overview subData={subData}/>}/>
        <Route path="/Subscription/:id" element={<Subscription subData={subData}/>} />
      </Routes>
    </section>
  );
}

export default App;
