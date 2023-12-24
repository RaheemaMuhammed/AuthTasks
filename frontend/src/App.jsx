import { useState,useEffect, useContext } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './Components/SignUp'
import LogIn from './Components/LogIn'
import Dashboard from './Components/Dashboard'
import Header from './Components/Header'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import OTPLogin from './Components/OTPLogin'
import { AuthContext } from './Context/AuthContext'
 
function App() {
  const {user}=useContext(AuthContext)
  
  
  return (

  <BrowserRouter>
  <Header/>
  <ToastContainer/>

  <Routes>
    <Route path='/' element={user ?<Navigate to={'/dashboard'}/> :<LogIn/>} />
    <Route path='/otp_login' element={user?<Navigate to={'/dashboard'}/> :<OTPLogin/>} />
    <Route path='/register' element={user?<Navigate to={'/dashboard'}/> :<SignUp/>} />
    <Route path='/dashboard' element={user?<Dashboard/>:<Navigate to={'/'}/> } />
  </Routes>
  </BrowserRouter>
  )
}

export default App
