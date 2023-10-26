import Header from '../Header';
import { useEffect, useRef, useState } from 'react'
import { store } from '../../store/reducers';
import EditContactForm from '../../forms/EditContact';
import { useSelector } from 'react-redux';


const defaultAvi = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60'


export default function ContactsTable() {
  const user = useSelector(state => state.user)
  const search = useSelector(state => state.search.val)
  const [open, setOpen] = useState(false);
  const [contact, setContact] = useState('')
  const [contacts, setContacts] = useState([])
  const allContacts = user['contacts']
  
  const cancelButtonRef = useRef(null)

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
  
  useEffect(() => {
    if (search) {
      const filteredContacts = allContacts?.filter(contact => filter(contact, search))
      setContacts(filteredContacts)
    } else {
      setContacts(allContacts)
    }
  }, [search])
  function convertDate(date) {
    const dates = date.split('-')
    return dates[1] + '/' + dates[2] + '/' + dates[0]
  }

  return (
      <div className="py-2">
        <EditContactForm open={open} setOpen={setOpen} contact={contact} />
        <Header title='Contacts' link='/dashboard/contacts/create'/>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            {/* Main content */}
              <div className="py-4">
                <div className="flex flex-col">
                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Name
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Title
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Contact
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Updated
                              </th>
                              <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Edit</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {allContacts.map((contact) => (
                              <tr key={contact.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                      <img className="h-10 w-10 rounded-full" src={defaultAvi} alt="" />
                                    </div>
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-gray-900">{contact.first_name + ' ' + contact.last_name}</div>
                                      <div className="text-sm text-gray-500">{contact.email}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{contact.title}</div>
                                      <div className="text-sm text-gray-500">{contact.company}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">{contact.telephone}</div>
                                  <div className="text-sm font-medium text-gray-900"><a href={contact.linkedin} className="text-indigo-600 hover:text-indigo-900">LinkedIn</a></div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{convertDate(contact.last_modified)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <button 
                                  className="text-indigo-600 hover:text-indigo-900"
                                  onClick={() => {
                                    setOpen(!open)
                                    setContact(contact)
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
