import Navbar from '@/components/Navbar'
import React from 'react'

const Analytics = () => {
    return (
        <>
            <div className="the-container flex bg-[linear-gradient(120deg,_#5e17eb,_#5f18eb66)]">

                <Navbar />

                <main className='flex-grow p-8 text-gray-800'>

                    <h2 className="text-2xl text-white font-semibold mb-6">Analytics Overview</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                        <div className="card bg-white rounded-lg shadow p-6 flex flex-col items-center">
                            <h3 className="text-lg font-semibold mb-2">Total Sales</h3>
                            <p className="text-2xl font-bold text-blue-600">₹1,20,000</p>
                        </div>
                        <div className="card bg-white rounded-lg shadow p-6 flex flex-col items-center">
                            <h3 className="text-lg font-semibold mb-2">Orders</h3>
                            <p className="text-2xl font-bold text-green-600">320</p>
                        </div>
                        <div className="card bg-white rounded-lg shadow p-6 flex flex-col items-center">
                            <h3 className="text-lg font-semibold mb-2">Customers</h3>
                            <p className="text-2xl font-bold text-yellow-600">210</p>
                        </div>
                        <div className="card bg-white rounded-lg shadow p-6 flex flex-col items-center">
                            <h3 className="text-lg font-semibold mb-2">Refunds</h3>
                            <p className="text-2xl font-bold text-red-600">8</p>
                        </div>
                    </div>

                    <div className="brand-group mt-10">
                        <h3 className="text-xl text-white font-semibold mb-4">Sales Trend</h3>
                        <div className="bg-white rounded-lg shadow p-6 flex items-center justify-center min-h-[200px]">
                            {/* Replace with your chart component or analytics visualization */}
                            <span className="text-gray-400">[Chart Placeholder]</span>
                        </div>
                    </div>

                </main>

            </div>
        </>
    )
}

export default Analytics
