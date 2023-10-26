import React, { useEffect, useReducer, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { CreateJob, GetNewToken, EditJob } from '../services/Api'
import Toggle from '../components/FormItems/Toggle'
import TextInput from '../components/FormItems/TextInput'
import DateInput from '../components/FormItems/DateInput'
import TextArea from '../components/FormItems/TextArea'
import Select from '../components/FormItems/Select'
import states from '../components/FormItems/states'
import { useDispatch, useSelector } from 'react-redux'
import { addJob, updateJob } from '../store/reducers'
import isUrl from 'is-valid-http-url'
import moment from 'moment'
moment().format('MM/DD/YYYY')

const defaultState = {
  company: '',
  job_title: '',
  description: '',
  url: '',
  requisition_id: '',
  open_date: new Date(),
  close_date: new Date(),
  remote: true,
  city: '',
  state: '',
  category: 'engineer',
  type: 'FT'
}

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'UPDATE_STATE':
      return  {...state, ...payload}
    case 'REPLACE_STATE':
      return payload 
    default:
      return state 
  }
}
export default function JobForm({ edit  }) {
  const history = useHistory()
  const [state, updateForm] = useReducer(reducer, defaultState)
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()
  const { id } = useParams() 
  const jobs = useSelector(({user}) => user.jobs)
  const userId = useSelector(state => state.user.id)
  
  const onChangeHandler = (key, val) => updateForm({ type: 'UPDATE_STATE', payload: {[key]: val}})

  const evaluateErrors = () => {
    const { company, job_title: jobtitle, description, url: link, open_date: openDate, close_date: closeDate, type, category } = state
    
    const errors = {
      company: company?.length < 2 ? 'please set length >= 2' : null,
      jobtitle: jobtitle?.length < 2 ? 'please set length >= 2' : null,
      description: description?.length < 15 ? 'please list languages required, yoe, etc' : null,
      link: !(isUrl(link)) ? 'please provide a link to the job posting' : null,
      type: !(['FT', 'PT', 'IT'].includes(type)) ? 'please provide a valid type' : null,
      category: category?.length < 5 ? 'please provide a valid category' : null,
    }
      setErrors(errors)
      return Object.values(errors).some(x => x !== null)
    }

   useEffect(() => {
    if (edit && id) {
      const job = jobs?.find(job => job?.id == id) || {}
      console.log('JOB', job, userId) 
      if ((job.user !== userId) || !job) {
        alert("You are not authorized to edit this job")
        history.push("/dashboard/jobs")
      } else {
        const enrichedJob = {
          ...job,
          open_date: job?.open_date ? new Date(job?.open_date) : new Date(),
          close_date: job?.close_date ? new Date(job?.close_date) : new Date()
        }
        updateForm({ type: 'REPLACE_STATE', payload: enrichedJob })
      }
    }
   }, [edit, id])

   
  
   const handleSubmit = async e => {
     e.preventDefault()
     if (evaluateErrors()) return
     const formattedState = { 
       ...state, 
       open_date: moment(state?.open_date).format('YYYY-MM-DD').toString(), 
       close_date: moment(state?.close_date).format('YYYY-MM-DD').toString()
      }
      
     try {
       await GetNewToken()
       const response  = edit ?  await EditJob(formattedState) : await CreateJob(formattedState)
       const { status, data} = response
       if (status === "success") {
          history.push("/dashboard/jobs")
        } else {
          alert("there was an error creating the job")
        }
     } catch (e) {
      console.error("something went wrong", e)
     }
   }

      return (
      <div className="pt-8 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <form className="space-y-8 divide-y divide-gray-200" onSubmit={e => handleSubmit(e)}>
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div>
            <h3 className="capitalize text-lg leading-6 font-medium text-gray-900">job info</h3>
            <p className="capitalize mt-1 text-sm text-gray-500">add info about the job you applied to.</p>
          </div>
          <div>
            <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
              <TextInput error={errors.company}  name="company" value={state.company} onChangeHandler={e => onChangeHandler('company', e.target.value)} />
              <TextInput error={errors.jobtitle} name="job_title" title="job title" value={state.job_title} onChangeHandler={e => onChangeHandler('job_title', e.target.value) }/>
              <TextArea error={errors.description} sentence="Job Requirements, Languages, Frameworks" name="description" value={state.description} onChangeHandler={e => onChangeHandler('description', e.target.value)} />
              <Toggle label='remote job?' onChangeHandler={() => onChangeHandler('remote', !state.remote)} value={state.remote}/>
              {!state.remote && <>
                <TextInput name="city" value={state.city} onChangeHandler={e => onChangeHandler('city', e.target.value)} />
                <Select selected={state.state} name='state' data={states} onChangeHandler={e => onChangeHandler('state', e.target.value) } />
              </>}
              <Select selected={state.type} onChangeHandler={e=>onChangeHandler('type', e.target.value)} name='type' label='job type' data={{'FT': 'Full Time', 'PT': 'Part Time', 'IT': 'Internship'}} />
              <TextInput error={errors.category}  name='category' value={state.category} onChangeHandler={e=>onChangeHandler('category', e.target.value)} />
              <TextInput error={errors.link} name="url" value={state.url} onChangeHandler={e => onChangeHandler('url', e.target.value)} />
              <TextInput name="requisition_id" title="req number" value={state.req} onChangeHandler={e => onChangeHandler('requisition_id', e.target.value)} />
              <DateInput  name="open_date" title="open date" value={state.open_date} onChangeHandler={date => onChangeHandler('open_date', date)} />
              <DateInput name="close_date" title="close date" value={state.close_date} onChangeHandler={date => onChangeHandler('close_date', date)} />
            </div>
          </div>
        </div>
  
        <div className="pt-5">
          <div className="flex justify-end">
            <button
              onClick={() => history.replace("/dashboard/jobs")}
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