import React, { useState }  from 'react'
import { MailIcon } from '@heroicons/react/solid'

export default function ContactForm(props) {
  return (
      <div className="space-y-8 divide-y divide-gray-200">
        <div className="pt-8">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Contact Information</h3>
            <p className="mt-1 text-sm text-gray-500">Stay current and in contact with recruiters and other connections.</p>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            {textInput('First name', 'first-name', props.firstName, props.setFirstName)}
            {textInput('Last name', 'last-name', props.lastName, props.setLastName)}
            {textInput('Company', 'company', props.company, props.setCompany)}
            {textInput('Title', 'title', props.title, props.setTitle)}

            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MailIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  maxLength="254"
                  value={props.email}
                  onChange={e => props.setEmail(e.target.value)}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                LinkedIn
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="url"
                  name="linkedin"
                  id="linkedin"
                  maxLength="200"
                  value={props.linkedin}
                  onChange={e => props.setLinkedIn(e.target.value)}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="http://www.linkedin.com/in/user"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="tel"
                  value={props.telephone}
                  maxLength="15"
                  name="telephone"
                  id="telephone"
                  onChange={e => props.setPhone(e.target.value)}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="(555) 987-6543"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

function textInput(title, name, value, changeHandler) {
  return <div className="sm:col-span-3">
    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
      {title}
    </label>
    <div className="mt-1">
      <input
        type="text"
        maxLength="50"
        value={value}
        name={name}
        id={name}
        autoComplete={name}
        onChange={e => changeHandler(e.target.value)}
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
    </div>
  </div>
}

