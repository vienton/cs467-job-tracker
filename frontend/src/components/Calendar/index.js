import moment from 'moment'
import { Calendar, momentLocalizer  } from 'react-big-calendar' 
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './style.scss'
import Header from '../Header';
import { React, useEffect} from 'react'
import { store } from '../../store/reducers';
import { useSelector } from 'react-redux';


const defaultAvi = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60'
const localizer = momentLocalizer(moment)

export default function ContactsTable() {
  const user = useSelector(state => state.user)
  const search = useSelector(state => state.search.val)
  const events = user.jobs.map(job => (
    {
      allDay: false,
      end: job.close_date,
      start: job.close_date,
      title: job.company,
    }
  ))


  const filter = (contact, searchParam) => {
    searchParam = searchParam.toLowerCase()

    for (let key in contact) {
      if (typeof(contact[key]) === 'string') {
        contact[key] = contact[key].toLowerCase()
      }
    }

    return `${contact?.first_name} ${contact?.last_name}`.includes(searchParam) ||
      contact?.email.includes(searchParam) || 
      contact?.telephone.includes(searchParam)
  }

  const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  })

  return (
      <div className="py-2">
        {/* <Header title='Calendar' link={null}/> */}
        <div className="px-8 py-6"><Calendar
          localizer={localizer}
          events={events}
          views={{
            month: true,
          }}
        />
        </div>
      </div>
  )
}
