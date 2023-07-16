import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'

const SelectedDates = () => {
  const [events, setEvents] = useState([])

  useEffect(()=>{
    fetch('http://localhost:5000/event')
  .then(res => res.json())
  .then(data => setEvents(data) )
  },[events])

// console.log(events);
// const {title,description,day} = events
// console.log();

  return (
    <div className='text-black flex gap-4 flex-col'>
      {
        events.map(ev => ( 
        <div key={ev._id}  className={`bg-${ev.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`} >
           <p className='font-bold text-black'>{ev.title}</p> 
           <p className='font-thin text text-slate-400 '>{ev.description}</p> 
           </div>
        ))
        // events.map(ev => <li key={ev._id}>{dayjs(ev.day).format("dddd, MMMM DD")}</li>)
      }
      {/* <li>{title}</li>
      <li>{description}</li>
      <li>{day}</li> */}
    </div>
  )
}

export default SelectedDates