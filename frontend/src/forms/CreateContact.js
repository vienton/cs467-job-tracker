import React, { useState }  from 'react'
import { MailIcon } from '@heroicons/react/solid'
import { useHistory } from 'react-router'
import { CreateContact } from '../services/Api'
import ContactForm from './ContactForm'
import { useDispatch, useSelector } from 'react-redux'
import { addContact } from '../store/reducers'

export default function CreateContactForm() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [company, setCompany] = useState('')
  const [linkedin, setLinkedIn] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setPhone] = useState('')
  const [title, setTitle] = useState('')

  const getContact = () => {return {first_name, last_name, company, title, email, linkedin, telephone}}

  const handleSubmit = async e => {
    e.preventDefault()
    const contact = getContact()
    try { 
      const response = await CreateContact(contact)
      if (response.status === "success") {
        console.log(response.payload)
        dispatch(addContact(response.payload))
        history.push('/dashboard/contacts')
      } else {
        alert('there was an error creating the contact')
      }
    } catch (e) {
      console.error('there was an error creating the contact', e)
      alert('unable to make the contact')
    }
  }

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
    <form className="space-y-8 divide-y divide-gray-200" onSubmit={e => handleSubmit(e)}>
      <ContactForm first_name={first_name} last_name={last_name} company={company} linkedin={linkedin} email={email} telephone={telephone} title ={title} setFirstName={setFirstName} setLastName={setLastName} setCompany={setCompany} setLinkedIn={setLinkedIn} setEmail={setEmail} setPhone={setPhone} setTitle={setTitle} />
      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
    </div>
  )
}

