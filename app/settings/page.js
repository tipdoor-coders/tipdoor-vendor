"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '@/components/Navbar'
import { fetchWithAuth } from '@/lib/api'

const Settings = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: ''
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [successMessage, setSuccessMessage] = useState('')

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetchWithAuth('user/')
                
                setUserData({
                    username: response.username,
                    email: response.email
                })
            } catch (err) {
                setError(err.message || 'Failed to fetch user data');
            } finally {
                setLoading(false)
            }
        }

        fetchUserData()
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUserData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setSuccessMessage('')

        try {
            const response = await fetchWithAuth('user/', {
                method: 'PUT',
                body: JSON.stringify(userData)
            });

            setSuccessMessage('Profile updated successfully!')
            setUserData({
                username: response.username,
                email: response.email
            })
        } catch (err) {
            setError(err.message || 'Failed to update profile')
        }
    }

    if (loading) {
        return (
            <>
                <div className="the-container flex bg-[linear-gradient(120deg,_#5e17eb,_#5f18eb66)]">
                    <Navbar />
                    <main className='flex-grow p-8 text-gray-800'>
                        <div className="bg-white rounded-lg shadow p-6 max-w-xl mx-auto">
                            <div className="animate-pulse">
                                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                                <div className="h-10 bg-gray-200 rounded mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                                <div className="h-10 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </main>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="the-container flex bg-[linear-gradient(120deg,_#5e17eb,_#5f18eb66)]">
                <Navbar />
                <main className='flex-grow p-8 text-gray-800'>
                    <h2 className="text-2xl font-semibold mb-6">Account Settings</h2>

                    {/* Success Message */}
                    {successMessage && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                            {successMessage}
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    <div className="bg-white rounded-lg shadow p-6 max-w-xl mx-auto">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block font-medium mb-1">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={userData.username}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Your username"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="you@example.com"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Update Profile
                            </button>
                        </form>
                    </div>

                    {/* Additional Settings Sections */}
                    <div className="bg-white rounded-lg shadow p-6 max-w-xl mx-auto mt-6">
                        <h3 className="text-lg font-semibold mb-4">Security</h3>
                        <button className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200">
                            Change Password
                        </button>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6 max-w-xl mx-auto mt-6">
                        <h3 className="text-lg font-semibold mb-4">Account Actions</h3>
                        <button className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors duration-200">
                            Delete Account
                        </button>
                    </div>
                </main>
            </div>
        </>
    )
}

export default Settings