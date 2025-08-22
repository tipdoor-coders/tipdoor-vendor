import Navbar from '@/components/Navbar'
import React from 'react'

const Orders = () => {
    return (
        <>
            <div className="the-container flex bg-[linear-gradient(120deg,_#5e17eb,_#5f18eb66)]">

                <Navbar />

                <main className='flex-grow p-8 text-gray-800'>

                    <h2 className="text-2xl text-white font-semibold mb-6">Order Summary</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                        <div className="card bg-white rounded-lg shadow p-6 flex flex-col items-center">
                            <h3 className="text-lg font-semibold mb-2">Total Orders</h3>
                            <p id="total-orders" className="text-2xl font-bold text-blue-600">0</p>
                        </div>
                        <div className="card bg-white rounded-lg shadow p-6 flex flex-col items-center">
                            <h3 className="text-lg font-semibold mb-2">Pending</h3>
                            <p id="pending-orders" className="text-2xl font-bold text-yellow-600">0 Orders</p>
                        </div>
                        <div className="card bg-white rounded-lg shadow p-6 flex flex-col items-center">
                            <h3 className="text-lg font-semibold mb-2">Shipped</h3>
                            <p id="shipped-orders" className="text-2xl font-bold text-green-600">0 Orders</p>
                        </div>
                        <div className="card bg-white rounded-lg shadow p-6 flex flex-col items-center">
                            <h3 className="text-lg font-semibold mb-2">Cancelled</h3>
                            <p id="cancelled-orders" className="text-2xl font-bold text-red-600">0 Orders</p>
                        </div>
                    </div>

                    <div className="brand-group mt-10">
                        <h3 className="text-xl text-white font-semibold">All Orders</h3>
                        <table className="product-table w-full mt-10 border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="py-3 px-4 text-left font-semibold">Order ID</th>
                                    <th className="py-3 px-4 text-left font-semibold">Customer</th>
                                    <th className="py-3 px-4 text-left font-semibold">Date</th>
                                    <th className="py-3 px-4 text-left font-semibold">Status</th>
                                    <th className="py-3 px-4 text-left font-semibold">Total</th>
                                    <th className="py-3 px-4 text-left font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-200 last:border-0 bg-black/70 backdrop-blur-sm transition duration-300 ease-in-out transform hover:scale-[1.01] hover:bg-black/60">
                                    <td className="py-2 px-4 text-white">#ORD-1001</td>
                                    <td className="py-2 px-4 text-white">Priya Sharma</td>
                                    <td className="py-2 px-4 text-white">Apr 20, 2025</td>
                                    <td className="py-2 px-4 text-white">
                                        <span className="status in-stock inline-block px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-semibold">
                                            Shipped
                                        </span>
                                    </td>
                                    <td className="py-2 px-4 text-white">₹3,499</td>
                                    <td className="py-2 px-4 text-white">
                                        <button className="edit bg-blue-600 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700 transition">
                                            View
                                        </button>
                                        <button className="delete bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                                            Cancel
                                        </button>
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200 last:border-0 bg-black/70 backdrop-blur-sm transition duration-300 ease-in-out transform hover:scale-[1.01] hover:bg-black/60">
                                    <td className="py-2 px-4 text-white">#ORD-1002</td>
                                    <td className="py-2 px-4 text-white">Rahul Verma</td>
                                    <td className="py-2 px-4 text-white">Apr 21, 2025</td>
                                    <td className="py-2 px-4 text-white">
                                        <span className="status out-of-stock inline-block px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs font-semibold">
                                            Pending
                                        </span>
                                    </td>
                                    <td className="py-2 px-4 text-white">₹2,299</td>
                                    <td className="py-2 px-4 text-white">
                                        <button className="edit bg-blue-600 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700 transition">
                                            View
                                        </button>
                                        <button className="delete bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                                            Cancel
                                        </button>
                                    </td>
                                </tr>
                                <tr className='border-b border-gray-200 last:border-0 bg-black/70 backdrop-blur-sm transition duration-300 ease-in-out transform hover:scale-[1.01] hover:bg-black/60'>
                                    <td className="py-2 px-4 text-white">#ORD-1003</td>
                                    <td className="py-2 px-4 text-white">Sneha Rathore</td>
                                    <td className="py-2 px-4 text-white">Apr 22, 2025</td>
                                    <td className="py-2 px-4 text-white">
                                        <span className="status inactive inline-block px-2 py-1 rounded bg-gray-200 text-gray-700 text-xs font-semibold">
                                            Cancelled
                                        </span>
                                    </td>
                                    <td className="py-2 px-4 text-white">₹1,499</td>
                                    <td className="py-2 px-4 text-white">
                                        <button className="edit bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">
                                            View
                                        </button>
                                    </td>
                                </tr>
                                {/* Add more orders as needed */}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>

        </>
    )
}

export default Orders
