import React, { useState } from "react";
import { NavLink } from 'react-router-dom'
import CallToAction from './cta'
import Footer from './footer'

function Index() {
    return (
        <>
            <nav className="w-full bg-gray-100">
                <div className="container py-5 mx-auto px-6 flex items-center justify-between">
                    <h1 className='titleLogo text-center font-bold text-3xl'>trackr</h1>
                    <NavLink to='signin'><button className="focus:outline-none md:block bg-transparent transition duration-150 ease-in-out hover:bg-gray-200 rounded border border-indigo-700 text-indigo-700 px-4 sm:px-8 py-1 sm:py-3 text-sm">Sign In</button></NavLink>
                </div>
            </nav>
            <div className="bg-gray-100">
                <div className="container mx-auto flex flex-col items-center py-12 sm:py-24">
                    <div className="w-11/12 sm:w-2/3 mb-5 sm:mb-10">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-gray-800 font-extrabold leading-tight">
                            Finding a job can be tough, with <span className="titleLogo">trackr</span> it's easy
                        </h1>
                        <p className="mt-5 sm:mt-10 text-gray-600 font-normal text-center text-lg sm:text-lg">Utilize the power of community to find job postings, maintain your network, and track your application progress - all in one place. </p>
                    </div>
                    <div className="flex justify-center items-center">
                        <NavLink to='/signup'><button className="focus:outline-none bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-4 sm:px-10 py-2 sm:py-4 text-sm">Sign Up</button></NavLink>
                        {/* <NavLink to='/signin'><button className="ml-4 focus:outline-none bg-white transition duration-150 ease-in-out hover:border-indigo-600 hover:text-indigo-600 rounded border border-indigo-700 text-indigo-700 px-4 sm:px-10 py-2 sm:py-4 text-sm">Live Demo</button></NavLink> */}
                    </div>
                </div>
            </div>
            <CallToAction />
            <Footer />
        </>
    );
}

export default Index;
