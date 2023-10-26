import { Fragment } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { DotsVerticalIcon } from '@heroicons/react/solid'
import { GetNewToken, ApplyToJob, SaveJob } from '../../services/Api'
import { applyToJob, saveJob } from '../../store/reducers'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default ({ job, open, setOpen, userId }) => {
  const dispatch = useDispatch() 

  const { open_date, close_date, job_title, company, id, description, user, remote, city, state, url } = job
  console.log('test', job, userId)
  const handleApply = async () => {

    try {
      await GetNewToken()
      const { status, data, msg } = await ApplyToJob(id, userId, job)
      if (status === 'success') { 
        alert('applied to job')
        dispatch(applyToJob(data))
      } else {
        if (msg) {
          alert("you've already applied to that job")
        }
        else  {
          alert('error saving job')
        }
      }
    } catch (e) {
      console.error('an error occurred applying to the job', e)
    }
  }

  const handleSave = async () => {
    try { 
      GetNewToken() 
      const { status } = await SaveJob(id, userId)
      if (status === "success") {
        alert("job saved")
        dispatch(saveJob(id))
      }
    } catch (e) {
      console.error('An error occurred saving the job')
      alert("could not save job")
    }
  }

  const handleShare = async () => {
    const text = 'Hey look at this cool job posting!'
    try {
      await navigator.share({ title: 'Trackr', text, url } )
    } catch (e) {
      console.error('there was an error sharing data', e)
    }
  }
  
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={setOpen}>
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0" />

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  <div className="px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h2 id="slide-over-heading" className="text-lg font-medium text-gray-900">
                        Profile
                      </h2>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Main */}
                  <div>
                    <div className="pb-1 sm:pb-6">
                      <div>
                        <div className="mt-6 px-4 sm:mt-8 sm:flex sm:items-end sm:px-6">
                          <div className="sm:flex-1">
                            <div>
                              <div className="flex items-center">
                                <h3 className="font-bold text-xl text-gray-900 sm:text-2xl">{company}</h3>
                              </div>
                              <p className="text-sm text-gray-500">{job_title}</p>
                            </div>
                            <div className="mt-5 flex flex-wrap space-y-3 sm:space-y-0 sm:space-x-3">
                              <button
                                onClick={handleApply}
                                type="button"
                                className="flex-shrink-0 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:flex-1"
                              >
                                Applied
                              </button>
                              <button
                                onClick={handleSave}
                                type="button"
                                className="flex-1 w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                Save Job
                              </button>
                              <span className="ml-3 inline-flex sm:ml-0">
                                <Menu as="div" className="relative inline-block text-left">
                                  <Menu.Button className="inline-flex items-center p-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-400 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    <span className="sr-only">Open options menu</span>
                                    <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
                                  </Menu.Button>
                                  <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                  >
                                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                      <div className="py-1">
                                        <Menu.Item>
                                          {({ active }) => (
                                            <div
                                              onClick={handleShare}
                                              href="#"
                                              className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm'
                                              )}
                                            >
                                              Share Job
                                            </div>
                                          )}
                                        </Menu.Item>
                                        {userId === user && <Menu.Item>
                                          {({ active }) => (
                                            <NavLink to={`jobs/edit/${job.id}`}>
                                            <div
                                              className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm'
                                              )}
                                            >
                                              Edit Job
                                            </div>
                                            </NavLink>
                                          )}
                                        </Menu.Item>}
                                      </div>
                                    </Menu.Items>
                                  </Transition>
                                </Menu>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 pt-5 pb-5 sm:px-0 sm:pt-0">
                      <dl className="space-y-8 px-4 sm:px-6 sm:space-y-6">
                        <div>
                          <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Description</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                            <p className="whitespace-pre-line">
                             {description}
                            </p>
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Location</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{ remote ? 'remote' : `${city}, ${state}`}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Link</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{url}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Open Date</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                            <time dateTime="1988-06-23">{open_date}</time>
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Close Date</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                            <time dateTime="1988-06-23">{close_date}</time>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

