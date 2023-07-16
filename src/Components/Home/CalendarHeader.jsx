import dayjs from 'dayjs';
import  { useContext } from 'react'
import GlobalContext from '../../Context/GlobalContext';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Link } from 'react-router-dom';

const CalendarHeader = () => {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }
  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }
  return (
    <header className="px-4 py-2 flex items-center">
      {/* <img src={logo} alt="calendar" className="mr-2 w-12 h-12" /> */}
      <Link to={'/'} >
      <h1 className="mr-10 text-xl text-gray-500 fond-bold">
        Calendar
      </h1>
      </Link>
      <button
        onClick={handleReset}
        className="border rounded py-2 px-4 mr-5"
      >
        Today
      </button>
      <button onClick={handlePrevMonth}>
      <ChevronLeftIcon className="cursor-pointer text-gray-600 mx-2" />
        {/* <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
          chevron_left
        </span> */}
      </button>
      <button onClick={handleNextMonth}>
      <ChevronRightIcon className="cursor-pointer text-gray-600 mx-2" />
        {/* <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
          chevron_right
        </span> */}
      </button>
      <h2 className="ml-4 text-xl text-gray-500 font-bold">
        {dayjs(new Date(dayjs().year(), monthIndex)).format(
          "MMMM YYYY"
        )}
      </h2>
      <Link to={'/cards'}
        
        className="border rounded py-2 px-4 ml-5"
      >
        Events
      </Link>
    </header>
  )
}

export default CalendarHeader