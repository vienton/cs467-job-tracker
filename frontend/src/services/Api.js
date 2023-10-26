import decode from 'jwt-decode'
const headers = new Headers({
    'Content-Type': 'application/json',
})

const checkCSRF = () => headers.set('csrf', localStorage.getItem('csrf'))
const checkToken = () => headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`)

checkCSRF() 
checkToken() 

export const Signup = async (userData) => {
    const headers = new Headers({'csrf': localStorage.getItem('csrf'), 'content-type': 'application/json'})
    return new Promise(async (res, rej) => {
        try {
            const response = await fetch('/users/', { headers, method: "POST", body: JSON.stringify(userData) } )
            const data = await response.json()
            const { status } = data
            if (status === 'success') {
                const body = JSON.stringify({ username: userData.username, password: userData.password })
                const response = await fetch("/api/token/", { headers, method: "POST",  body  })
                const  data = await response.json()
                localStorage.setItem('token', data.access)
                localStorage.setItem('refresh', data.refresh)
                return res({ "status": "success" })
            }
        }
         catch (err) {
            console.error(err, 'there was an error signin up')
            return rej({ "status": "error", err})
        }
    })
}


       

export const Login = async (username, password ) => {
    const headers = new Headers({'csrf': localStorage.getItem('csrf'), 'content-type': 'application/json'})
    return new Promise(async (res, rej) => {
        try {
            const response = await fetch("/api/token/", { method: "POST", headers, body: JSON.stringify({ username, password })})
            const data = await response.json()
            if (data.access) {
                localStorage.setItem('token', data.access)
                localStorage.setItem('refresh', data.refresh)
                return res({ status: "success" })
            }
            else {
                return res({ status: "error", err: "username password combo incorrect" })
            }
        } catch (err) {
           console.error('error logging in', err)
           return rej({ status: "error", err })
        }
    })
}

export const SaveJob = async (jobId, userId) => {
    return new Promise(async (res, rej) => {
        try { 
            const response = await fetch(`/users/${userId}/jobs/${jobId}/save/`, { method: "POST", headers })
            const { status} = await response.json()
            if (status === 'success') {
                return res({ "status": "success"})
            } 
            return rej({"status": "error" })
        } catch (e) {
            return rej({"status": "error" })
        }
    })
}

export const ApplyToJob = async (jobId, userId, data) => {
    const body = JSON.stringify(data) 
    return new Promise(async (res, rej) => {
        try { 
            const response = await fetch(`/users/${userId}/jobs/${jobId}/apply/`, { method: "POST", headers, body })
            const { status, data } = await response.json()
            if (status === 'success') {
                return res({ "status": "success", data })
            } 
            return rej({ "status": "error" })
        } catch (e) {
            return rej({"status": "error" })
        }
    })
}

export const GetJobs = async () => {
    const token = localStorage.getItem('refresh')
    return new Promise(async (res, rej) => {
        try {
            const response = await fetch(`/jobs`, { method: "GET", headers })
            const { data } = await response.json() 
            return res({status: "success", data})
        } catch (e) {
            console.error('something went wrong getting user data', e)
            return rej({status: "error" })
        }
    })
}

export const GetUserData = async () => {
    const token = localStorage.getItem('refresh')
    const { user_id } = decode(token)
    return new Promise(async (res, rej) => {
        try {
            const response = await fetch(`/users/${user_id}/`, { method: "GET", headers })
            const data = await response.json() 
            return res({status: "success", data})
        } catch (e) {
            console.error('something went wrong getting user data', e)
            return rej({status: "error" })
        }
    })
}

export const EditJob = async (data) => {
    const { user, id } = data
    const body = JSON.stringify(data)
    return new Promise(async (res, rej) => {
        try {
            const response = await fetch(`/users/${user}/jobs/${id}/`, { method: "PUT", headers, body })
            const data = await response.json()
            if (data.status === "success") {
                return res(data)
            } else {
                return rej({ status: "error" })
            }
        } catch (e) {
            console.error('error updating job', e)
            return rej({ status: "error"})
        }
    })
}

export const GetNewToken = async () => {
    try {
        const refresh = localStorage.getItem('refresh')
        const body = JSON.stringify({ refresh })
        const response = await fetch('/api/token/refresh/', { method: "POST", headers, body })
        const data = await response.json() 
        if (data.access) {
            localStorage.setItem('token', data.access)
            checkToken()
        } else {
            throw { error: { msg: "an error occurred refreshing token"}}
        }
    } catch (e) {
        localStorage.removeItem('token')
        localStorage.removeItem('refresh')
        window.location.href.replace('/signin')
        console.error('error getting new token', e)
    }
}



export const CreateJob = async (data) => {
    const token = localStorage.getItem('token')
    const { user_id } = decode(token)
    const body = JSON.stringify(data)
    return new Promise(async (res, rej) => {
        try {
            const response = await fetch(`/users/${user_id}/jobs/`, { method: "POST", headers, body })
            const { status, data} = await response.json()
            if (status === 'success') {
                return res({ status: "success",  data })
            } else {
                return rej({ status: "fail" })
            }
        } catch (err) {
            return rej({status: "fail"})
        }
    })
}

export const CreateContact = async (data) => {
    checkCSRF()
    checkToken()
    const token = localStorage.getItem('token')
    const { user_id } = decode(token)
    const body = JSON.stringify(data)
    return new Promise(async (res, rej) => {
        try {
            const response = await fetch(`/users/${user_id}/contacts/`, { method: "POST", headers, body })
            const data = await response.json()
            if (data.status === 'success') {
                return res({ status: "success" , payload: data.payload})
            } else {
                return rej({ status: "fail" })
            }
        } catch (err) {
            return rej({status: "fail"})
        }
    })
}

export const EditContact = async (data) => {
    const { user, id } = data
    const body = JSON.stringify(data)
    return new Promise(async (res, rej) => {
        try {
            const response = await fetch(`/users/${user}/contacts/${id}/`, { method: "PUT", headers, body })
            const data = await response.json()
            if (data.status === 'success') {
                return res({ status: "success" })
            } else {
                return rej({ status: "error" })
            }
        } catch (e) {
            console.error('error updating contact', e)
            return rej({ status: "error"})
        }
    })
}

export const DeleteContact = async (data) => {
    const { user, id } = data
    const body = JSON.stringify(data)
    return new Promise(async (res, rej) => {
        try {
            const response = await fetch(`/users/${user}/contacts/${id}/`, { method: "DELETE", headers, body })
            const data = await response.json()
            if (data.status === 'success') {
                return res({ status: "success" })
            } else {
                return rej({ status: "error" })
            }
        } catch (e) {
            console.error('error deleting contact', e)
            return rej({ status: "error"})
        }
    })
}

export const GetContacts = async => {
    checkCSRF()
    checkToken()
    const token = localStorage.getItem('token')
    const { user_id } = decode(token)
    return new Promise(async (res, rej) => {
        try {
            const response = await fetch(`/users/${user_id}/contacts/`, { method: "GET", headers})
            const data = await response.json()
            if (data.status === 'success') {
                return res({ status: "success", data: response.data })
            } else {
                return rej({ status: "fail", data: null})
            }
        } catch (err) {
            return rej({status: "fail", data: null})
        }
    })
}

export const CreateApplication = async (data) => {
    checkCSRF()
    checkToken()
    const token = localStorage.getItem('token')
    const { user_id } = decode(token)
    const body = JSON.stringify(data)
    return new Promise(async (res, rej) => {
        try {
            const response = await fetch(`/users/${user_id}/applications/`, { method: "POST", headers, body })
            const data = await response.json()
            if (data.status === 'success') {
                return res({ status: "success", payload: data.payload})
            } else {
                return rej({ status: "fail" })
            }
        } catch (err) {
            return rej({status: "fail"})
        }
    })
}

export const EditApplication = async (data) => {
    checkCSRF()
    checkToken()
    const { user, id } = data
    const body = JSON.stringify(data)
    return new Promise(async (res, rej) => {
        try {
            const response = await fetch(`/users/${user}/applications/${id}/`, { method: "PUT", headers, body })
            const data = await response.json()
            if (data.status === 'success') {
                return res({ status: "success" })
            } else {
                return rej({ status: "error" })
            }
        } catch (e) {
            console.error('error updating application', e)
            return rej({ status: "error"})
        }
    })
}

export const DeleteApplication = async (data) => {
    checkCSRF()
    checkToken()
    const { user, id } = data
    console.log(id)
    const body = JSON.stringify(data)
    return new Promise(async (res, rej) => {
        try {
            const response = await fetch(`/users/${user}/applications/${id}/`, { method: "DELETE", headers, body })
            const data = await response.json()
            if (data.status === 'success') {
                return res({ status: "success" })
            } else {
                return rej({ status: "error" })
            }
        } catch (e) {
            console.error('error deleting application', e)
            return rej({ status: "error"})
        }
    })
}

export const GetApplications = async => {
    checkCSRF()
    checkToken()
    const token = localStorage.getItem('token')
    const { user_id } = decode(token)
    return new Promise(async (res, rej) => {
        try {
            const response = await fetch(`/users/${user_id}/applications/`, { method: "GET", headers})
            const data = await response.json()
            if (data.status === 'success') {
                return res({ status: "success", data: response.data })
            } else {
                return rej({ status: "fail", data: null})
            }
        } catch (err) {
            return rej({status: "fail", data: null})
        }
    })
}