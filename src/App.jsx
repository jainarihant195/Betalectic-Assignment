import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import View from './components/View';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  const [favPackage, setFavPackage] = useState([]);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          {/* Pass favPackage state and setFavPackage function as props */}
          <Route path='/' element={<Home favPackage={favPackage} setFavPackage={setFavPackage} />} />
          <Route path='/view' element={<View favPackage={favPackage} setFavPackage={setFavPackage} />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
