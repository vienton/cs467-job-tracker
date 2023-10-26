import './style.css'
import React, { Fragment, useRef, useEffect, useState } from 'react'
import Header from '../Header';
import { useSelector } from 'react-redux';
import { store } from '../../store/reducers';
import EditApplicationForm from '../../forms/EditApplication';
import Application from '../Application'
  
export default function ApplicationTable() {
    const user = useSelector(state => state.user)
    const search = useSelector(state => state.search.val)
    const allApps = user['applications']
    const [openForm, setOpenForm] = useState(false);
    const [application, setApplication] = useState('')
    const [applications, setApplications] = useState([])
    const [openApplication, setOpenApplication] = useState(false);

    const filter = (app, search) => {
      search = search.toLowerCase()
      let filterKeys = Object.values(app)
      let filterOn = filterKeys.map(x => x.toLowerCase ? x.toLowerCase() : x)
      return filterOn?.map(x => x.includes && x?.includes(search)).some(x => x)
    }

    useEffect(() => {
      if  (search) {
        const filteredApps = allApps?.filter(app => filter(app, search))
        setApplications(filteredApps)
      } else {
        setApplications(allApps)
      }
    }, [search])

    useEffect(() => {
      setApplications(allApps)
    }, [allApps])

    function convertDate(date) {
      const dates = date.split('-')
      return dates[1] + '/' + dates[2] + '/' + dates[0]
    }

    return (
        <div className="py-2">
          <React.Fragment>
            <EditApplicationForm open={openForm} setOpen={setOpenForm} application={application} />
            <Application open={openApplication} setOpen={setOpenApplication} application={application} convertDate={convertDate} />
          </React.Fragment>
          <Header title='Applications' link='/dashboard/applications/create' />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Main content */}
                <div className="py-4">
                  <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                          <table className="min-w-full divide-y divide-solid divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Company
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Req ID
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Job Title
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Applied Date
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Close Date
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Status
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                  <span className="sr-only">Edit</span>
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-solid divide-gray-200">
                              {applications.map((application) => (
                                <tr key={application.id}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{application.company}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{application.requisition_id}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <button
                                      className="text-indigo-600 hover:text-indigo-900"
                                      onClick={() => {
                                        setOpenApplication(!openApplication)
                                        setApplication(application)
                                        }}>
                                      {application.job_title}
                                    </button>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{convertDate(application.applied_date)}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{convertDate(application.close_date)}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.job_status}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button 
                                    className="text-indigo-600 hover:text-indigo-900"
                                    onClick={() => {
                                      setOpenForm(!openForm)
                                      setApplication(application)
                                      }}>
                                      Edit
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
          {/* /End main content */}
        </div>
      </div>
    )
}