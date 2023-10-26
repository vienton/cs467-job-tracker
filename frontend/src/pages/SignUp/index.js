import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router'
import { Signup } from '../../services/Api';
import { validate as validEmail} from 'email-validator'

import './style.css'
export default function SignUp() {
    const history = useHistory()

    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConf, setPasswordConf] = useState('')
    const [errors, setErrors] = useState(false)
    
    const validate = () => {
        const errors = []
        if (username.length < 2) errors.push('enter a username > 2 characters')
        if (!firstName) errors.push('enter a first name')
        if (!lastName) errors.push('enter a last name')
        if (!validEmail(email)) errors.push('enter a valid email')
        if (password !== passwordConf) errors.push('passwords don\'t match')
        if (password.length < 8) errors.push('password must be 8 characters')
        setErrors(errors)
        return errors.length === 0

    }
    const handleSubmit = async () => {
        
        if (!validate()) return 
        const body = ({ username, first_name: firstName, last_name: lastName, password, email })
        try {
            const res = await Signup(body)
            const { status } = res 
            if (status === 'success') {
                history.push("/dashboard")
            } else {
                setErrors([res.err])
            }
        } 
        catch (err) {
            setErrors([err])
            console.error(err, 'could not sign up')
        }
}
    return (
        <>
            <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                    <h1 className="titleLogo font-bold text-5xl">trackr</h1>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register a new account</h2>
                </div>
        
                <div className="mt-8 sm:mx-auto sm:w-full md:max-w-2xl lg:max-w-3xl">
                    <div className="bg-white p-4 shadow sm:rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="m-3">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <div className="mt-1">
                                <input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="username"
                                required
                                minLength="1"
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="m-3">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                id="email"
                                name="email"
                                type="text"
                                autoComplete="email"
                                placeholder="email"
                                required
                                minLength="1"
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="m-3">
                            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                                First name
                            </label>
                            <div className="mt-1">
                                <input
                                id="first_name"
                                name="first_name"
                                type="text"
                                placeholder="First name"
                                required
                                minLength="1"
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="m-3">
                            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                                Last name
                            </label>
                            <div className="mt-1">
                                <input
                                id="last_name"
                                name="last_name"
                                type="text"
                                placeholder="Last name"
                                required
                                minLength="1"
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="m-3">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Password"
                                required
                                minLength="4"
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="m-3">
                            <label htmlFor="passwordConf" className="block text-sm font-medium text-gray-700">
                                Password confirmation
                            </label>
                            <div className="mt-1">
                                <input
                                id="password_conf"
                                name="password_conf"
                                type="password"
                                placeholder="Confirm password"
                                required
                                minLength="4"
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={passwordConf}
                                onChange={e => setPasswordConf(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="md:col-span-2 m-3 flex justify-center">
                        {errors.length > 0 && <div class="w-full md:w-3/4 lg:w-2/4 text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                {errors.map((error,index) => <span key={`error-${index}`} class="block sm:block">{error}</span>)}
            </div>}
                        </div>
                        <div className="md:col-span-2 m-3 flex justify-center">
                            <button
                                onClick={e => handleSubmit(e)}
                                className="w-full md:w-3/4 lg:w-2/4 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Sign up
                            </button>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </>
    )
}
