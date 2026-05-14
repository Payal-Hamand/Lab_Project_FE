import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Welcome from './pages/Welcome'
import Home from './pages/Home'
import UploadPrescription from './pages/UploadPrescription'
import CompareTests from './pages/CompareTests'
import BookSlot from './pages/BookSlot'
import Confirmation from './pages/Confirmation'
import Login from './pages/Login'
import LandingPage from './pages/LandingPage'
import Signup from './pages/Signup'

function App() {
  return (
    <BrowserRouter>
      <Routes>
       <Route path='/' element={<LandingPage />} />
        <Route path='/signup' element={<Signup />} />    
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/upload' element={<UploadPrescription />} />
        <Route path='/compare' element={<CompareTests />} />
        <Route path='/book-slot' element={<BookSlot />} />
        <Route path='/confirmation' element={<Confirmation />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App