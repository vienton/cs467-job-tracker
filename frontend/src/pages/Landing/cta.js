import React from "react";
import { NavLink } from 'react-router-dom'

function CallToAction() {
    return (
        <>
            <div className="md:mx-auto md:container px-4">
                <div className="pt-10 md:pt-20">
                    <div className="container mx-auto">
                        <div className="flex flex-wrap items-center pb-12">
                            <div className="md:w-1/2 lg:w-2/3 w-full xl:pr-20 md:pr-6">
                                <div className="py-2 text-color">
                                    <h1 className="text-2xl lg:text-6xl md:leading-snug tracking-tighter f-f-l font-black">Track the progress of your applications</h1>
                                    <h2 className="text-lg lg:text-3xl lg:leading-7 md:leading-10 f-f-r py-4 md:py-8">Here at trackr we know what the job hunt is like for computer science students. We've done it. We created trackr so others could evaluate their own performance and be diligent in their job hunt.</h2>
                                    <div className="flex items-center cursor-pointer pb-4 md:pb-0">
                                        <NavLink to="/signup"><h3 className="f-f-r text-lg lg:text-2xl font-semibold underline text-indigo-700">Lets Get Started</h3></NavLink>
                                        <div className="pl-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                <path d="M13.1719 12L8.22192 7.04999L9.63592 5.63599L15.9999 12L9.63592 18.364L8.22192 16.95L13.1719 12Z" fill="#D53F8C" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:w-1/3 md:w-1/2 w-full relative h-96 flex items-end justify-center">
                                <img className="absolute w-full h-full inset-0 object-cover object-center rounded-md" src="https://i.ibb.co/SmCQNXs/Screen-Shot-2021-11-27-at-9-42-31-AM.png" alt />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pb-14 pt-16">
                    <div className="mx-auto">
                        <div className="flex flex-wrap flex-row-reverse items-center">
                            <div className="md:w-1/2 lg:w-2/3 w-full lg:pl-20 md:pl-10 sm:pl-0 pl-0">
                                <div className="py-2 text-color">
                                    <h1 className="text-2xl lg:text-6xl tracking-tighter md:leading-snug f-f-l font-black">Easily find job postings at top companies</h1>
                                    <h2 className="text-lg lg:text-3xl leading-7 md:leading-10 f-f-r py-8">The community of aspiring software engineers online is large and helpful. trackr provides a one-stop-shop for those on the job hunt to share the job postings they've found and track their progress.</h2>
                                    <div className="flex items-center cursor-pointer pb-4 md:pb-0">
                                    <NavLink to="/signup"><h3 className="f-f-r text-lg lg:text-2xl font-semibold underline text-indigo-700">Lets Get Started</h3></NavLink>
                                        <div className="pl-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                <path d="M13.1719 12L8.22192 7.04999L9.63592 5.63599L15.9999 12L9.63592 18.364L8.22192 16.95L13.1719 12Z" fill="#D53F8C" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:w-1/3 md:w-1/2 w-full relative h-96 flex items-end justify-center">
                                <img className="absolute w-full h-full inset-0 object-cover object-center rounded-md" src="https://i.ibb.co/R6zG7yf/Screen-Shot-2021-11-27-at-9-38-07-AM.png" alt />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-16 pb-10 md:pt-20">
                    <div className="container mx-auto">
                        <div className="flex flex-wrap items-center pb-12">
                            <div className="md:w-1/2 lg:w-2/3 w-full xl:pr-20 md:pr-6">
                                <div className="py-2 text-color">
                                    <h1 className="text-2xl lg:text-6xl md:leading-snug tracking-tighter f-f-l font-black">Manage your network and stay connected</h1>
                                    <h2 className="text-lg lg:text-3xl lg:leading-7 md:leading-10 f-f-r py-4 md:py-8">You're going to meet a lot of amazing people on your journey. trackr helps you stay organized, up to date, and connected with everyone.</h2>
                                    <div className="flex items-center cursor-pointer pb-4 md:pb-0">
                                        <NavLink to="/signup"><h3 className="f-f-r text-lg lg:text-2xl font-semibold underline text-indigo-700">Lets Get Started</h3></NavLink>
                                        <div className="pl-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                <path d="M13.1719 12L8.22192 7.04999L9.63592 5.63599L15.9999 12L9.63592 18.364L8.22192 16.95L13.1719 12Z" fill="#D53F8C" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:w-1/3 md:w-1/2 w-full relative h-96 flex items-end justify-center">
                                <img className="absolute w-full h-full inset-0 object-cover object-center rounded-md" src="https://i.ibb.co/7G5cqF3/Screen-Shot-2021-11-27-at-9-42-45-AM.png" alt />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CallToAction;
