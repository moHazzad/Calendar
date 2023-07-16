// import { useState } from 'react'

import { Outlet } from 'react-router-dom'
import './App.css'
import CalendarHeader from './Components/Home/CalendarHeader'
// import Home from './Components/Home/Home'

function App() {
  

  return (
    <>
    <div className="h-screen flex flex-col">

    <CalendarHeader />
     <Outlet />
    </div>
    </>
  )
}

export default App
