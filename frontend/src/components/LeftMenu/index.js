import React from 'react'
import "./style.css"



export default function LeftMenu() {
    return (
        <div className="left-menu">
            <ul>
                <li className="active">
                    Applications
                    <ul className="sublist">
                        <li className="active">All (75)</li>
                        <li>Active (30)</li>
                        <li>Rejected (45)</li>
                    </ul>
                </li>
                <li>Contacts</li>
                <li >Jobs</li>
                <li>Statistics</li>
            </ul>
        </div>
    )
}
