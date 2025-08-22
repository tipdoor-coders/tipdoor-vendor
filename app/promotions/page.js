import React from 'react'
import Navbar from '@/components/Navbar'

const Promotions = () => {
    return (
        <>
            <div className="the-container flex bg-[linear-gradient(120deg,_#5e17eb,_#5f18eb66)]">

                <Navbar />

                <main className='flex-grow p-8 text-gray-800'>

                    <h2 className="text-2xl font-semibold mb-6">Promotions Overview</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
                        <div className="card bg-white rounded-lg shadow p-6 flex flex-col items-center">
                            <h3 className="text-lg font-semibold mb-2">Active Promotions</h3>
                            <p className="text-2xl font-bold text-green-600">3</p>
                        </div>
                        <div className="card bg-white rounded-lg shadow p-6 flex flex-col items-center">
                            <h3 className="text-lg font-semibold mb-2">Upcoming</h3>
                            <p className="text-2xl font-bold text-blue-600">2</p>
                        </div>
                        <div className="card bg-white rounded-lg shadow p-6 flex flex-col items-center">
                            <h3 className="text-lg font-semibold mb-2">Expired</h3>
                            <p className="text-2xl font-bold text-red-600">5</p>
                        </div>
                    </div>

                    <div className="brand-group mt-10">
                        <h3 className="text-xl font-semibold mb-4">Promotion List</h3>
                        <table className="w-full mt-6 border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="py-3 px-4 text-left font-semibold">Promotion</th>
                                    <th className="py-3 px-4 text-left font-semibold">Type</th>
                                    <th className="py-3 px-4 text-left font-semibold">Start Date</th>
                                    <th className="py-3 px-4 text-left font-semibold">End Date</th>
                                    <th className="py-3 px-4 text-left font-semibold">Status</th>
                                    <th className="py-3 px-4 text-left font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="py-2 px-4">Summer Sale</td>
                                    <td className="py-2 px-4">Discount</td>
                                    <td className="py-2 px-4">May 1, 2025</td>
                                    <td className="py-2 px-4">May 31, 2025</td>
                                    <td className="py-2 px-4">
                                        <span className="inline-block px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-semibold">
                                            Active
                                        </span>
                                    </td>
                                    <td className="py-2 px-4">
                                        <button className="edit bg-yellow-400 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-500 transition">
                                            Edit
                                        </button>
                                        <button className="delete bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-2 px-4">New Year Blast</td>
                                    <td className="py-2 px-4">BOGO</td>
                                    <td className="py-2 px-4">Jan 1, 2025</td>
                                    <td className="py-2 px-4">Jan 7, 2025</td>
                                    <td className="py-2 px-4">
                                        <span className="inline-block px-2 py-1 rounded bg-red-100 text-red-700 text-xs font-semibold">
                                            Expired
                                        </span>
                                    </td>
                                    <td className="py-2 px-4">
                                        <button className="edit bg-yellow-400 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-500 transition">
                                            Edit
                                        </button>
                                        <button className="delete bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4">Monsoon Offer</td>
                                    <td className="py-2 px-4">Free Shipping</td>
                                    <td className="py-2 px-4">Jul 10, 2025</td>
                                    <td className="py-2 px-4">Jul 20, 2025</td>
                                    <td className="py-2 px-4">
                                        <span className="inline-block px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-semibold">
                                            Upcoming
                                        </span>
                                    </td>
                                    <td className="py-2 px-4">
                                        <button className="edit bg-yellow-400 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-500 transition">
                                            Edit
                                        </button>
                                        <button className="delete bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                                {/* Add more promotions as needed */}
                            </tbody>
                        </table>
                    </div>

                </main>

            </div>
        </>
    )
}

export default Promotions
