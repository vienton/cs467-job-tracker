/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/outline'
import ContactForm from './ContactForm'
import { useHistory } from 'react-router'
import { GetNewToken, GetUserData, EditContact, DeleteContact } from '../services/Api'
import { store, login, updateContact } from '../store/reducers';
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'

export default function EditContactForm(props) {
  const history = useHistory()
  const dispatch = useDispatch()
  const user = store.getState()['user']
  const [firstName, setFirstName] = useState(props.contact.first_name)
  const [lastName, setLastName] = useState(props.contact.last_name)
  const [company, setCompany] = useState(props.contact.company)
  const [linkedin, setLinkedIn] = useState(props.contact.linkedin)
  const [email, setEmail] = useState(props.contact.email)
  const [telephone, setPhone] = useState(props.contact.telephone)
  const [title, setTitle] = useState(props.contact.title)

  useEffect( () => {
    setFirstName(props.contact.first_name)
    setLastName(props.contact.last_name)
    setCompany(props.contact.company)
    setLinkedIn(props.contact.linkedin)
    setEmail(props.contact.email)
    setPhone(props.contact.telephone)
    setTitle(props.contact.title)
  }, [props.contact])

  const cancelButtonRef = useRef(null)

  const getData = () => {
    const data = {
      'first_name': firstName,
      'last_name': lastName,
      'company': company,
      'linkedin': linkedin,
      'email': email,
      'telephone': telephone,
      'title': title,
      'id': props.contact.id,
      'created': props.contact.created,
      'user': user['id']
    }
    return data
  }

  const handleEdit = async e => {
    e.preventDefault()
    const data = getData()
    try {
      await GetNewToken()
      const { status } = await EditContact(data)
       if (status === "success") {
         data['last_modified'] = new Date().toISOString().split('T')[0]
         dispatch(updateContact(data))
       } else {
         alert("there was an error editing the contact")
       }
    } catch (e) {
     console.error("something went wrong", e)
    }
    props.setOpen(false)
  }

  const refreshData = async e => {
    try {
      const token = localStorage.getItem('token')
      const decodedToken = decode(token)
      if (decodedToken.exp < Date.now()) {
          await GetNewToken()
      }
      const { data } = await GetUserData() 
      dispatch(login(data))
      history.push('/dashboard/contacts')
    } catch (e) {
        console.error(e)
    }
  }

  const handleDelete = async e => {
    e.preventDefault()
    const data = getData()
    try {
      await GetNewToken()
      const { status } = await DeleteContact(data)
       if (status === "success") {
         refreshData()
       } else {
         alert("there was an error deleting the contact")
       }
    } catch (e) {
     console.error("something went wrong", e)
    }
    props.setOpen(false)
  }

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={props.setOpen}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <form className="space-y-8 divide-y divide-gray-200" onSubmit={e => handleEdit(e)}>
              <ContactForm firstName={firstName} lastName={lastName} company={company} linkedin={linkedin} email={email} telephone={telephone} title ={title} setFirstName={setFirstName} setLastName={setLastName} setCompany={setCompany} setLinkedIn={setLinkedIn} setEmail={setEmail} setPhone={setPhone} setTitle={setTitle} />
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-3 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-3 sm:text-sm"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-1 sm:text-sm"
                  onClick={e => handleDelete(e)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-2 sm:text-sm"
                  onClick={() => props.setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
