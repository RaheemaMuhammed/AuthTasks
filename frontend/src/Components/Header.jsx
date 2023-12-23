import React, { useState,useEffect,useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { AuthContext } from '../Context/AuthContext'
const Header = () => {
  const { user, updateUser } = useContext(AuthContext)
  const handleLogout=()=>{
    updateUser(null)
  }
   
  return (
  
        <header>
        <nav className="bg-primary border-gray-200 px-4 lg:px-6 py-2.5 w-screen ">
        <div className="flex flex-wrap justify-between mt-2 items-center max-w-screen-xl mx-8 my-3">
            <Link to={'/'}>
            
            <p className='text-4xl text-btnColor text-center font-semibold'>Task Manager</p>
            </Link>
            {user && <>
            
            <p className='text-lg'>{user}</p>
            <p className='text-btnColor text-center font-semibold cursor-pointer' onClick={handleLogout}>LogOut</p>
            </>}
             
        </div>
    </nav>
</header>
        
  )
}

export default Header