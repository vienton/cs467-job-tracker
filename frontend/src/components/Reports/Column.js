
import React from 'react'


export default ({item, children}) => {
    const { id, name, stat, icon } = item
    return (
        <div key={id} className="content-center bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
          <div>
            <p className="text-md text-center font-medium text-gray-500 truncate">{name}</p>
          </div>
          {!children && <div className="ml-16 pb-6 flex items-baseline sm:pb-7">
            <p className="mt-10 text-2xl font-semibold text-gray-900">{stat}</p> 
          </div> }
            <div className="mt-5">
            {children}
            </div>
        </div>
    )
}