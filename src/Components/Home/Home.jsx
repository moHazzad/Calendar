// import React from 'react'
// import CalendarHeader from './CalendarHeader'
import Sidebar from './Sidebar'
import Month from './Month'
import { getMonth } from '../Utils';
import { useContext, useEffect, useState } from 'react';
import GlobalContext from '../../Context/GlobalContext';
import EventModal from './EventModal';

const Home = () => {
    const [currenMonth, setCurrentMonth] = useState(getMonth());
    const { monthIndex, showEventModal } = useContext(GlobalContext);
  
    useEffect(() => {
      setCurrentMonth(getMonth(monthIndex));
    }, [monthIndex]);
  
  return (

    <>
    {showEventModal && <EventModal  />}

    
        {/* <CalendarHeader /> */}
        <div className="flex flex-1">
          <Sidebar />
          <Month month={currenMonth} />
        </div>
      
    </>
    )
}

export default Home