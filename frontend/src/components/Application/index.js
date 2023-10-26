import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'

export default function Application({ application, open, setOpen, convertDate }) {
  
  const { applied_date, close_date, job_title, company, description, url, requisition_id, job_status} = application

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
                          {/* <XIcon className="h-6 w-6" aria-hidden="true" /> */}
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
                                <h3 className="font-bold text-xl text-gray-900 sm:text-2xl">{job_title}</h3>
                              </div>
                              <p className="text-sm text-gray-500">{company}</p>
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
                          <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Requisition ID</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{requisition_id}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Link</dt>
                          <dd className="mt-1 text-sm text-indigo-600 hover:text-indigo-900 sm:col-span-2"><a href={url} target="_blank">{url}</a></dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Applied Date</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                            <time dateTime={applied_date}>{applied_date}</time>
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Close Date</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                            <time dateTime={close_date}>{close_date}</time>
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Status</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{job_status}</dd>
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

