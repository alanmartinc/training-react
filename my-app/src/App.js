import React from 'react'
import {Route, Routes } from 'react-router-dom';
import Formulario from './Components/index.tsx';
import Login from './Components/Login/Login.tsx';
import Home from './pages/home.tsx';
 


function App() {
  return (
    <Routes>
     
       <Route path="/" element={<Login />} />
       <Route path="/Home" element={<Home />} />
       <Route path="/form" element={<Formulario />} />

    </Routes>
  );
}

export default App;