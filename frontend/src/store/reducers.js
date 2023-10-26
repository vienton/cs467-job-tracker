import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const ADD_JOB = 'ADD_JOB';
const UPDATE_JOB = 'UPDATE_JOB';
const ADD_CONTACT = 'ADD_CONTACT';
const UPDATE_CONTACT = 'UPDATE_CONTACT';
const SET_JOBS = 'SET_JOBS';
const UPDATE_SEARCH = 'UPDATE_SEARCH'
const CLEAR_STATE = 'CLEAR_STATE'
const SAVE_JOB = 'SAVE_JOB' 
const APPLY_TO_JOB = 'APPLY_TO_JOB'
const ADD_APPLICATION = 'ADD_APPLICATION';
const UPDATE_APPLICATION = 'UPDATE_APPLICATION';

export const updateJob = payload => ({ type: UPDATE_JOB, payload })
export const login = (payload) => ({ type: LOGIN, payload })
export const logout = () => ({ type: LOGOUT })
export const addJob = (payload) => ({ type: ADD_JOB, payload: {...payload } })
export const addContact = payload => ({ type: ADD_CONTACT, payload})
export const updateContact = payload => ({ type: UPDATE_CONTACT, payload})
export const resetJobs = payload => ({ type: SET_JOBS, payload })
export const updateSearch = payload => ({ type: UPDATE_SEARCH, payload  })
export const clearSearch = payload => ({ type: CLEAR_STATE })
export const saveJob = payload => ({ type: SAVE_JOB, payload })
export const applyToJob = payload => ({ type: APPLY_TO_JOB, payload })
export const addApplication = payload => ({ type: ADD_APPLICATION, payload})
export const updateApplication = payload => ({ type: UPDATE_APPLICATION, payload})

const user = {
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    jobs: [],
    applications: [],
    contacts: [],
    saved_jobs: [],
    applied_jobs: [],
}

const UserReducer = (state=user, action) => {
    switch (action.type) {
        case LOGIN: {
            return {...state, ...action.payload}
        }
        case LOGOUT: {
            return user;
        }
        case ADD_JOB: {
            const jobs = [action.payload, ...state.jobs ]
            return { ...state, jobs }
        }
        case UPDATE_JOB: {
            const jobs = [...state.jobs] 
            const { id } = action.payload 
            const newJobs = jobs.map(job => job.id === id ? action.payload : job)
            return { ...state, jobs: newJobs }
        }
        case ADD_CONTACT: {
            const contacts = [...state.contacts, action.payload]
            return { ...state, contacts}
        }
        case UPDATE_CONTACT: {
            const contacts = [...state.contacts] 
            const { id } = action.payload 
            const newContacts = contacts.map(contact => contact.id === id ? action.payload : contact)
            return { ...state, contacts: newContacts }
        }
        case SET_JOBS: {
            return { ...state, jobs: action.payload}
        }
        case SAVE_JOB: {
            return { ...state, saved_jobs: [...state.saved_jobs, action.payload ]}
        }
        case APPLY_TO_JOB: {
            return { ...state, applications: [ action.payload, ...state.applications]}
        }
        case ADD_APPLICATION: {
            const applications = [...state.applications, action.payload]
            console.log(action.payload)
            return { ...state, applications}
        }
        case UPDATE_APPLICATION: {
            const applications = [...state.applications] 
            const { id } = action.payload 
            const newApplications = applications.map(application => application.id === id ? action.payload : application)
            return { ...state, applications: newApplications }
        }
        default: {
            return state 
        }
    }
}

const search = {
    val: ''
}

const SearchReducer = (state=search, action) => {
    switch (action.type) {
        case UPDATE_SEARCH:
            return { ...state, val: action.payload }
        case CLEAR_STATE:
            return search 
        default:
            return state 
    }
}


const reducers = combineReducers({
    user: UserReducer,
    search: SearchReducer
})

export const store = createStore(reducers, composeWithDevTools(
    applyMiddleware()
))