import React from 'react';
import PersonList from '../../../components/personList';
// import '../Admin.css';
// import './SuperDashboard.css';

export default function SuperDashboard() {
    return (
        <div className="container mx-auto flex flex-col gap-4 p-4">
            <div className='pt-5 border-b-2 border-gray-400'>
                <h2 className='font-bold text-2xl text-[#243445]'>Dashboard</h2>
            </div>

            <div className='rounded border border-gray-400 overflow-hidden'>
                <div className='bg-[#243445] p-3'>
                    <h4 className='font-bold text-white'>XYZ pvt</h4>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 p-4'>
                    <p className='text-gray-800'>Primary Admin Name : ABCD XYZ</p>
                    <p className='text-gray-800'>Primary Admin Email : ABCD@gmail.com</p>
                    <p className='text-gray-800'>No. of Subscribers/Token : 1000</p>
                </div>

                {/* Metrics Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
                    {/* Assigned */}
                    <div className="border rounded p-4">
                        <p className="text-gray-700 font-semibold">Assigned</p>
                        <div className="flex justify-between text-center">
                            <div className="flex-1 border-r pr-4">
                                <h2 className="text-xl text-gray-900">25</h2>
                                <small className="text-gray-600">Video Used</small>
                            </div>
                            <div className="flex-1 pl-4">
                                <h2 className="text-xl text-gray-900">50</h2>
                                <small className="text-gray-600">Total Videos</small>
                            </div>
                        </div>
                    </div>

                    {/* Utilized */}
                    <div className="border rounded p-4">
                        <p className="text-gray-700 font-semibold">Utilized</p>
                        <div className="flex justify-between text-center">
                            <div className="flex-1 border-r pr-4">
                                <h2 className="text-xl text-gray-900">25</h2>
                                <small className="text-gray-600">Mins Used</small>
                            </div>
                            <div className="flex-1 pl-4">
                                <h2 className="text-xl text-gray-900">60</h2>
                                <small className="text-gray-600">Total Mins</small>
                            </div>
                        </div>
                    </div>

                    {/* Renewal Date */}
                    <div className="border rounded p-4 flex items-center justify-center">
                        <p className="text-gray-700 font-semibold">Renewal Date</p>
                        <h5 className="text-lg text-gray-900">25/12/2025</h5>
                    </div>

                    {/* Comment Box */}
                    <div className="border rounded p-4 flex flex-col h-full">
                        <textarea
                            placeholder="Write a Comment"
                            className="border-none bg-white p-2 resize-none focus:ring-0 focus:outline-none h-20"
                        ></textarea>
                        <div className="text-right mt-2">
                            <button className='rounded-full p-2 bg-[#243445] text-white flex items-center justify-center'>
                                <img src='/icons/send-btn-arrow.svg' alt='send-button' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='border border-gray-400 rounded-lg shadow-lg p-4'>
                <PersonList />
            </div>
        </div>
    );
}
