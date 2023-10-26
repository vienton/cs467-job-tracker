import React, { useState, useEffect } from 'react'
import { CalendarIcon, LocationMarkerIcon, UsersIcon, ClipboardCheckIcon } from '@heroicons/react/solid'
import Header from '../Header';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { GetNewToken, GetJobs } from '../../services/Api';
import { setJobs, resetJobs } from '../../store/reducers';
import Drawer from '../Drawer'


export default function JobsTable() {
  const userId = useSelector(state => state?.user.id)
  const allJobs = useSelector(state => state?.user.jobs)
  const saved = useSelector(state => state?.user?.saved_jobs)
  
  const search = useSelector(state => state?.search?.val)
  const [jobs, setJobs] = useState([])
  const [job, setJob] = useState({})
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch() 

  const savedSet = new Set(saved)

  const sort = (sortBy) => {
    switch (sortBy) {
      case 'all':
        setJobs(allJobs)
        break
      case 'saved':
        setJobs(allJobs.filter(({ id }) => saved?.includes(id)))
        break 
      case 'PT':
      case 'FT':
      case 'IT':
        setJobs(allJobs.filter(({ type }) => type === sortBy ))
        break
      default:
        return 
    }
  }

  const filter = (job, searchParam) => {
    searchParam = searchParam.toLowerCase()
    let filterKeys = Object.values(job)
    if (searchParam === 'remote') {
      return job.remote
    } else {
      const keysToFilterOn = filterKeys.map(x => x?.toLowerCase && x.toLowerCase())
      return keysToFilterOn.map(p => p?.includes(searchParam)).some(p => p)
    }
  }

  useEffect(() => {
    const filteredJobs = allJobs?.filter(x => filter(x, search))
    setJobs(filteredJobs)
  }, [search])

  const handleGetAllJobs = async () => {
    await GetNewToken()
    const { data } = await GetJobs()
    dispatch(resetJobs(data))
  }

  useEffect(() => {
    setJobs(allJobs)
  }, [allJobs])

  useEffect(() => {
    handleGetAllJobs()
  }, [])

  const calculateColor = type => {
    switch (type) {
      case 'PT':
        return "bg-red-500 text-white"
      case 'FT':
        return "bg-yellow-500 text-white"
      case 'IT':
        return "bg-blue-500 text-white"
      default: 
        return "bg-green-100 text-green-800"
      
    }
  }


  const handleJobClick = id => {
    const job = jobs.find(j => j.id === id)
    setJob(job)
    setOpen(true)
  }


  return (
      <div className="py-2">
      <Drawer userId={userId} job={job} open={open} setOpen={setOpen} />
      <Header title='Jobs' link='/dashboard/jobs/create' />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <button onClick={() => sort('all')} className="mr-2 bg-blue-500 hover:bg-blue-700 text-white p-2 rounded text-xs font-bold">ALL</button>
        <button onClick={() => sort('saved')} className="mr-2 bg-green-500 hover:bg-green-700 text-white p-2 rounded text-xs font-bold">SAVED</button>
        <button onClick={() => sort('PT')} className="mr-2 bg-red-500 hover:bg-red-700 text-white p-2 rounded text-xs font-bold">PART TIME</button>
        <button onClick={() => sort('FT')} className="mr-2 bg-yellow-500 hover:bg-yellow-700 text-white p-2 rounded text-xs font-bold">FULL TIME</button>
        <button onClick={() => sort('IT')} className="mr-2 bg-blue-500 hover:bg-blue-700 text-white p-2 rounded text-xs font-bold">INTERNSHIPS</button>
      </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            {/* Main content */}
              <div className="py-4">
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul role="list" className="divide-y divide-gray-200">
                {jobs.map((position) => (
                  <li key={position.id}>
                    <div onClick={() => handleJobClick(position.id)} className="block hover:bg-gray-50">
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-indigo-600 truncate">{position.job_title} at {position.company}</p>
                          <div className="ml-2 flex-shrink-0 flex">
                            <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${calculateColor(position.type)}`}>
                              {position.type}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500">
                              <UsersIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                              {position.category}
                            </p>
                            <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                              <LocationMarkerIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                              {position.remote ? 'remote' : `${position.city}, ${position.state}`}
                            </p>
        
                            {savedSet.has(position.id)  && <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                              <ClipboardCheckIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                              Saved!
                            </p>
                            }
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <p>
                              Closing on <time dateTime={position.close_date}>{position.close_date}</time>
                            </p>
                          </div>
                          
                         
                        </div>
                        
                      </div>
                     
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* /End main content */}
        </div>
      </div>
  )
}
