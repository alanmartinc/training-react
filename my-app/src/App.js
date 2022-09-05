import React from 'react'
import {Route, Routes } from 'react-router-dom';
import Formulario from './Components/index.tsx';
 


function App() {
  return (
    <Routes>
     
       <Route path="/" element={<Formulario />} />
    
    </Routes>
  );
}

export default App;