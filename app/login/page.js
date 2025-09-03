'use client';
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});
        
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/auth/login/', formData);
            
            // Store tokens based on the API response structure
            if (response.data.access) {
                localStorage.setItem('accessToken', response.data.access);
                localStorage.setItem('refreshToken', response.data.refresh);
                
                // Show success message
                alert('Login successful! Redirecting to dashboard...');
                
                // Redirect to dashboard
                router.push('/home');
            } else {
                setErrors({ general: 'Login successful but no access token received.' });
            }
            
        } catch (error) {
            console.error('Login error:', error.response?.data);
            if (error.response?.data) {
                // Handle different error response formats
                if (error.response.data.detail) {
                    setErrors({ general: error.response.data.detail });
                } else if (error.response.data.non_field_errors) {
                    setErrors({ general: error.response.data.non_field_errors[0] });
                } else {
                    setErrors(error.response.data);
                }
            } else if (error.request) {
                setErrors({ general: 'Network error. Please check your connection.' });
            } else {
                setErrors({ general: 'Login failed. Please try again.' });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#5e17eb] to-[#5f18eb66] p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
                <div className="bg-gradient-to-r from-[#5e17eb] to-[#6d2eed] text-white p-6 text-center">
                    <h1 className="text-2xl font-bold">Vendor Login</h1>
                    <p className="text-white/90 mt-1">Access your vendor account</p>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                Username
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fas fa-user text-gray-400"></i>
                                </div>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className={`block w-full pl-10 pr-3 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                                    placeholder="Enter your username"
                                    required
                                />
                            </div>
                            {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fas fa-lock text-gray-400"></i>
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`block w-full pl-10 pr-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                        </div>
                    </div>

                    {errors.general && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                            {errors.general}
                        </div>
                    )}

                    {errors.non_field_errors && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                            {errors.non_field_errors}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-[#5e17eb] to-[#6d2eed] text-white py-3 px-4 rounded-lg font-medium hover:from-[#5015cc] hover:to-[#5c26d4] transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-70"
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Signing in...
                            </span>
                        ) : (
                            'Sign in'
                        )}
                    </button>

                    <div className="text-center text-sm text-gray-600 mt-4">
                        <span>{"Don't have an account? "}</span>
                        <Link href="/register" className="text-purple-600 font-medium hover:text-purple-500">
                            Register here
                        </Link>
                    </div>
                </form>
            </div>

            {/* Add Font Awesome if not already included in your project */}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        </div>
    );
}