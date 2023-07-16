import React from 'react'
import CreateEventButton from './CreateEventButton'
import SmallCalendar from './SmallCalendar'
import SelectedDates from './SelectedDates'

const Sidebar = () => {
  return (
    <aside className="border p-5 w-64">
      <CreateEventButton />
      <SmallCalendar />
      <SelectedDates />
      
    </aside>
  )
}

export default Sidebar