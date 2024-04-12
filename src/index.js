import React from 'react';
import ReactDOM from 'react-dom/client';
import Map from './Map';
import Gym from './Gym';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {
  return (
   <Router>
    <Routes>
      <Route path='/' exact element={<Map/>}/>  
      <Route path='/gym/:gymId' exact element={<Gym/>}/>  
    </Routes>
   </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
