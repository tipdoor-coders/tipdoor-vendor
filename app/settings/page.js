import React from 'react'
import Navbar from '@/components/Navbar'

const Settings = () => {
    return (
        <>
            <div className="the-container flex bg-[linear-gradient(120deg,_#5e17eb,_#5f18eb66)]">

                <Navbar />

                <main className='flex-grow p-8 text-gray-800'>
                    
          <h2 className="text-2xl font-semibold mb-6">Account Settings</h2>

          <div className="bg-white rounded-lg shadow p-6 max-w-xl mx-auto">
            <form>
              <div className="mb-4">
                <label className="block font-medium mb-1">Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Your Name"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="you@example.com"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-1">Password</label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="********"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>

                </main>

            </div>
        </>
    )
}

export default Settings
