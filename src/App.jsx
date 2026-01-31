import React from 'react'
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import Auth from './pages/Auth';
import DashFront from './pages/DashFront';
const App = () => {
  return (
    <Routes>
        <Route path="/Tool" element={<HomePage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<DashFront/>}/>
      </Routes>
  )
}

export default App