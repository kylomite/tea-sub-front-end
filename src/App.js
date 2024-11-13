import './App.css';
import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";

import teaTrade from './assets/teaTrade.png';
import Overview from './Overview/Overview';
import Subscription from './Subscription/Subscription';

function App() {
  const navigate = useNavigate();
  return (
    <section>
      <header>
        <img className='logo' src={teaTrade} alt='Tea Trade Logo' onClick={() => {navigate(`/`)}}/>
        <p>this is my react app!</p>
      </header>
      <Routes>
        <Route />
        <Route path="/" element={<Overview />}/>
        <Route path="/Subscription" element={<Subscription />} />
      </Routes>
    </section>
  );
}

export default App;
