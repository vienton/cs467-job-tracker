import React, { useState }  from 'react'
import { useHistory } from 'react-router'
import { CreateApplication } from '../services/Api'
import ApplicationForm from './ApplicationForm'
import { useDispatch, useSelector } from 'react-redux'
import { addApplication } from '../store/reducers'

export default function CreateApplicationForm() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [applied_date, setAppliedDate] = useState('')
    const [job_status, setStatus] = useState('')
    const [job_title, setTitle] = useState('')
    const [company, setCompany] = useState('')
    const [description, setDescription] = useState('')
    const [url, setURL] = useState('')
    const [close_date, setCloseDate] = useState('')
    const [requisition_id, setReqID] = useState('')

    const getApplication = () => {return {applied_date, close_date, job_title, company, description, url, requisition_id, job_status}}

    const handleSubmit = async e => {
        e.preventDefault()
        const application = getApplication()
        try {
            const response = await CreateApplication(application)
            if (response.status === "success") {
                dispatch(addApplication(response.payload))
                history.push('/dashboard/applications')
            } else {
                alert('there was an error creating the application')
            }
        } catch (e) {
            console.error('there was an error creating the application', e)
            alert('unable to make the application')
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <form className="space-y-8 divide-y divide-gray-200" onSubmit={e => handleSubmit(e)}>
                <ApplicationForm 
                    applied_date={applied_date} 
                    close_date={close_date} 
                    job_title={job_title}
                    company={company} 
                    description={description} 
                    url={url} 
                    requisition_id ={requisition_id} 
                    job_status={job_status} 
                    setAppliedDate={setAppliedDate} 
                    setCloseDate={setCloseDate} 
                    setTitle={setTitle}
                    setCompany={setCompany} 
                    setDescription={setDescription} 
                    setURL={setURL} 
                    setReqID={setReqID} 
                    setStatus={setStatus} />

                <div className="pt-5">
                    <div className="flex justify-end">
                        <button
                            onClick={() => history.goBack()}
                            type="button"
                            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >Cancel</button>
                        <button
                            type="submit"
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >Save</button>
                    </div>
                </div>
            </form>
        </div>
    )
}