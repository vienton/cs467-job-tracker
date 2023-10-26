import React, { useState }  from 'react'

export default function ApplicationForm(props) {
    return (
        <div className="space-y-8 divide-y divide-gray-200">
            <div className="pt-8">
                <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Job Application</h3>
                    <p className="mt-1 text-sm text-gray-500">Use this form to save your job application information.</p>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <DateInput title="Applied Date" name="applied_date" value={props.applied_date} onChangeHandler={e => props.setAppliedDate(e.target.value)} />
                    <DateInput title="Close Date" name="close_date" value={props.close_date} onChangeHandler={e => props.setCloseDate(e.target.value)} />
                    {textInput('Job Title', 'job_title', props.job_title, props.setTitle)}
                    {textInput('Company', 'company', props.company, props.setCompany)}
                    {textArea('Job Description', 'description', props.description, props.setDescription)}
                    {jobLink('Link to Job Posting', 'url', props.url, props.setURL)}
                </div>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    {textInput('Job Requisition ID', 'requisition_id', props.requisition_id, props.setReqID)}
                    {jobStatus('Status', 'job_status', props.job_status, props.setStatus)}
                </div>
            </div>
        </div>
    )
}

function textInput(title, name, value, changeHandler) {
    return <div className="sm:col-span-3">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {title ? title : name}
      </label>
      <div className="mt-1">
        <input
          type="text"
          value={value}
          name={name}
          id={name}
          autoComplete={name}
          onChange={e => changeHandler(e.target.value)}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
      </div>
    </div>
}

function textArea(title, name, value, changeHandler) {
    return <div className="sm:col-span-6">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {title ? title : name}
      </label>
      <div className="mt-1">
        <textarea
            type="text"
            value={value}
            name={name}
            rows={3}
            id={name}
            autoComplete={name}
            onChange={e => changeHandler(e.target.value)}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">
        </textarea>
      </div>
    </div>
}

function jobLink(title, name, value, changeHandler) {
    return <div className="sm:col-span-6">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {title ? title : name}
      </label>
        <div className="mt-1">
            <input
            type="url"
            id={name}
            name={name}
            value={value}
            placeholder="https://jobsite.com"
            onChange={e => changeHandler(e.target.value)}
            className="shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"/>
        </div>
    </div>
}

function jobStatus(title, name, value, changeHandler) {
    return <div className="sm:col-span-3">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
            {title ? title : name}
        </label>
        <div className="mt-1">
            <select
                required
                value={value}
                name={name}
                id={name}
                autoComplete={name}
                onChange={e => changeHandler(e.target.value)}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full border-transparent bg-transparent sm:text-sm rounded-md"
            >
                <option value="" disabled>Select a status</option>
                <option value="Applied">Applied</option>
                <option value="Saved">Saved</option>
                <option value="Assessed">Completed Assessment</option>
                <option value="Interviewed">Interviewed</option>
                <option value="Offered">Offered</option>
                <option value="Rejected">Rejected</option>
                <option value="Declined">Declined</option>
                <option value="Withdrawned">Withdrawned</option>
                <option value="Ghosted">Ghosted</option>
                <option value="Dead">Dead</option>
                <option value="Other">Other</option>
            </select>
        </div>
    </div>
}

const DateInput = ({name, value, title, onChangeHandler}) => (
    <div className="sm:col-span-3">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
            {title ? title : name}
        </label>
        <div className="mt-1">
        <div className="max-w-lg flex rounded-md shadow-sm">
            <input
            pattern="\d{4}-\d{2}-\d{2}"
            value={value}
            onChange={onChangeHandler}
            type="date"
            name={name}
            id={name}
            placeholder="YYYY-MM-DD"
            className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
            />
        </div>
        </div>
    </div>
)