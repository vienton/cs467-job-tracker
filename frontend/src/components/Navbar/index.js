import React from 'react'
import { useHistory } from 'react-router'
import './style.css'

export default function Navbar() {
    const history = useHistory()

    const logout = () => { 
        localStorage.removeItem('token')
        history.push("/signin")
    }
    return (
        <div className="navbar">
            <h1>Trackr</h1>
            <ul>
                <li>Students</li>
                <li>Recruiters</li>
                <li onClick={logout}>Log out</li>
            </ul>
            <div className="avatar"></div>
        </div>
    )
}
