'use client';
import Navbar from '@/components/Navbar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { fetchWithAuth } from '@/lib/api';

const Promotions = () => {
    const [promotions, setPromotions] = useState([]);
    const [products, setProducts] = useState([]);
    const [stats, setStats] = useState({
        active: 0,
        upcoming: 0,
        expired: 0,
    });
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        promo_code: '',
        discount_type: 'percentage',
        discount_value: '',
        applicable_products: [],
        banner_image: null,
        is_active: true,
    });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState(null);

    // Fetch promotions and products, compute stats
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch promotions
                const promoResponse = await fetchWithAuth('vendor/promotions/');
                console.log('Fetched promotions:', promoResponse);
                setPromotions(promoResponse);

                // Compute stats
                const now = new Date();
                const active = promoResponse.filter(
                    (p) =>
                        p.is_active &&
                        new Date(p.start_date) <= now &&
                        new Date(p.end_date) >= now
                ).length;
                const upcoming = promoResponse.filter(p => new Date(p.start_date) > now).length;
                const expired = promoResponse.data.filter(p => new Date(p.end_date) < now).length;
                setStats({ active, upcoming, expired });

                // Fetch vendor's products
                const productResponse = await fetchWithAuth('vendor/products/');
                console.log('Fetched products:', productResponse);
                setProducts(productResponse);
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err.message);
            }
        };
        fetchData();
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
        if (files) {
            console.log('Selected banner image:', files[0]);
        }
    };

    // Handle applicable products selection
    const handleProductChange = (e) => {
        const selected = Array.from(e.target.selectedOptions, option => parseInt(option.value));
        setFormData({ ...formData, applicable_products: selected });
    };

    // Handle checkbox change
    const handleCheckboxChange = (e) => {
        setFormData({ ...formData, is_active: e.target.checked });
    };

    // Handle add/edit promotion
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('description', formData.description);
            data.append('start_date', formData.start_date);
            data.append('end_date', formData.end_date);
            data.append('promo_code', formData.promo_code);
            data.append('discount_type', formData.discount_type);
            data.append('discount_value', formData.discount_value);
            data.append('is_active', formData.is_active);
            if (formData.banner_image) {
                data.append('banner_image', formData.banner_image);
            }
            formData.applicable_products.forEach((id) => {
                data.append(`applicable_products`, id);
            }
            );

            const endpoint = editingId
                ? `vendor/promotions/${editingId}/`
                : "vendor/promotions/";
            const method = editingId ? "PUT" : "POST";

            const response = await fetchWithAuth(endpoint, { method, body: data });

            if (editingId) {
                console.log(`Sending PUT to /api/vendor/promotions/${editingId}/`);
                setPromotions(promotions.map((p) => (p.id === editingId ? response : p)));
                setEditingId(null);
            } else {
                console.log('Sending POST to /api/vendor/promotions/');
                setPromotions([...promotions, response]);
            }

            // Reset form
            setFormData({
                title: '', description: '', start_date: '', end_date: '',
                promo_code: '', discount_type: 'percentage', discount_value: '',
                applicable_products: [], banner_image: null, is_active: true
            });

            // Recompute stats
            const now = new Date();
            const active = promotions.filter(p =>
                p.is_active && new Date(p.start_date) <= now && new Date(p.end_date) >= now
            ).length;
            const upcoming = promotions.filter(p => new Date(p.start_date) > now).length;
            const expired = promotions.filter(p => new Date(p.end_date) < now).length;
            setStats({ active, upcoming, expired });

            setError(null);
        } catch (err) {
            console.error("Form submission error:", err);
            setError(err.message);
        }
    };

    // Handle edit button
    const handleEdit = (promotion) => {
        setEditingId(promotion.id);
        setFormData({
            title: promotion.title,
            description: promotion.description,
            start_date: promotion.start_date.slice(0, 16),
            end_date: promotion.end_date.slice(0, 16),
            promo_code: promotion.promo_code,
            discount_type: promotion.discount_type,
            discount_value: promotion.discount_value,
            applicable_products: promotion.applicable_products.map(p => p.id),
            banner_image: null,
            is_active: promotion.is_active,
        });
    };

    // Handle delete button
    const handleDelete = async (id) => {
        try {
            console.log(`Sending DELETE to /api/vendor/promotions/${id}/`);
            await fetchWithAuth(`vendor/promotions/${id}/`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPromotions(promotions.filter((p) => p.id !== id));

            // Recompute stats
            const now = new Date();
            const active = promotions.filter(p =>
                p.is_active && new Date(p.start_date) <= now && new Date(p.end_date) >= now
            ).length;
            const upcoming = promotions.filter(p => new Date(p.start_date) > now).length;
            const expired = promotions.filter(p => new Date(p.end_date) < now).length;
            setStats({ active, upcoming, expired });
            setError(null);
        } catch (err) {
            console.error("Delete error:", err);
            setError(err.message);
        }
    };

    // Compute promotion status
    const getStatus = (promotion) => {
        const now = new Date();
        if (!promotion.is_active) return 'Inactive';
        if (new Date(promotion.end_date) < now) return 'Expired';
        if (new Date(promotion.start_date) > now) return 'Upcoming';
        return 'Active';
    };

    return (
        <>
            <div className="the-container flex bg-[linear-gradient(120deg,_#5e17eb,_#5f18eb66)]">
                <Navbar />
                <main className="flex-grow p-8 text-gray-800">
                    <h2 className="text-2xl font-semibold mb-6 text-white">Promotions Overview</h2>
                    {error && <p className="text-red-500 mb-4">{JSON.stringify(error)}</p>}

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
                        <div className="card bg-white rounded-lg shadow p-6 flex flex-col items-center">
                            <h3 className="text-lg font-semibold mb-2">Active Promotions</h3>
                            <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                        </div>
                        <div className="card bg-white rounded-lg shadow p-6 flex flex-col items-center">
                            <h3 className="text-lg font-semibold mb-2">Upcoming</h3>
                            <p className="text-2xl font-bold text-blue-600">{stats.upcoming}</p>
                        </div>
                        <div className="card bg-white rounded-lg shadow p-6 flex flex-col items-center">
                            <h3 className="text-lg font-semibold mb-2">Expired</h3>
                            <p className="text-2xl font-bold text-red-600">{stats.expired}</p>
                        </div>
                    </div>

                    {/* Add/Edit Promotion Form */}
                    <div className="card bg-white p-5 rounded-md shadow-xl mb-7">
                        <h3 className="mb-2.5 font-bold text-lg text-slate-700">
                            {editingId ? 'Edit Promotion' : 'Add New Promotion'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Promotion Title"
                                    required
                                    className="border p-2 w-full rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Promotion Description"
                                    className="border p-2 w-full rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                                <input
                                    type="datetime-local"
                                    name="start_date"
                                    value={formData.start_date}
                                    onChange={handleChange}
                                    required
                                    className="border p-2 w-full rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">End Date</label>
                                <input
                                    type="datetime-local"
                                    name="end_date"
                                    value={formData.end_date}
                                    onChange={handleChange}
                                    required
                                    className="border p-2 w-full rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Promo Code</label>
                                <input
                                    type="text"
                                    name="promo_code"
                                    value={formData.promo_code}
                                    onChange={handleChange}
                                    placeholder="Promo Code"
                                    required
                                    className="border p-2 w-full rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Discount Type</label>
                                <select
                                    name="discount_type"
                                    value={formData.discount_type}
                                    onChange={handleChange}
                                    className="border p-2 w-full rounded-md"
                                >
                                    <option value="percentage">Percentage</option>
                                    <option value="fixed">Fixed</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Discount Value</label>
                                <input
                                    type="number"
                                    name="discount_value"
                                    value={formData.discount_value}
                                    onChange={handleChange}
                                    placeholder="Discount Value"
                                    required
                                    step="0.01"
                                    className="border p-2 w-full rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Applicable Products</label>
                                <select
                                    name="applicable_products"
                                    multiple
                                    value={formData.applicable_products}
                                    onChange={handleProductChange}
                                    className="border p-2 w-full rounded-md"
                                >
                                    {products.map(product => (
                                        <option key={product.id} value={product.id}>{product.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Banner Image</label>
                                <input
                                    type="file"
                                    name="banner_image"
                                    onChange={handleChange}
                                    accept="image/*"
                                    className="border p-2 w-full rounded-md"
                                />
                                {editingId && formData.banner_image === null && promotions.find(p => p.id === editingId)?.banner_image && (
                                    <p className="text-sm text-gray-500 mt-1">
                                        Current image: <a href={promotions.find(p => p.id === editingId).banner_image} target="_blank" rel="noopener noreferrer">View</a>
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="is_active"
                                    checked={formData.is_active}
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                />
                                <label className="text-sm font-medium text-gray-700">Active</label>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                >
                                    {editingId ? 'Update Promotion' : 'Add Promotion'}
                                </button>
                                {editingId && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setEditingId(null);
                                            setFormData({
                                                title: '', description: '', start_date: '', end_date: '',
                                                promo_code: '', discount_type: 'percentage', discount_value: '',
                                                applicable_products: [], banner_image: null, is_active: true
                                            });
                                        }}
                                        className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    <div className="brand-group mt-10">
                        <h3 className="text-xl font-semibold mb-4 text-white">Promotion List</h3>
                        <table className="w-full mt-6 border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="py-3 px-4 text-left font-semibold">Promotion</th>
                                    <th className="py-3 px-4 text-left font-semibold">Promo Code</th>
                                    <th className="py-3 px-4 text-left font-semibold">Discount</th>
                                    <th className="py-3 px-4 text-left font-semibold">Start Date</th>
                                    <th className="py-3 px-4 text-left font-semibold">End Date</th>
                                    <th className="py-3 px-4 text-left font-semibold">Status</th>
                                    <th className="py-3 px-4 text-left font-semibold">Banner</th>
                                    <th className="py-3 px-4 text-left font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {promotions.length > 0 ? (
                                    promotions.map((promotion) => {
                                        const status = getStatus(promotion);
                                        return (
                                            <tr
                                                key={promotion.id}
                                                className="border-b border-gray-200 last:border-0 bg-black/70 backdrop-blur-sm transition duration-300 ease-in-out transform hover:scale-[1.01] hover:bg-black/60"
                                            >
                                                <td className="py-2 px-4 text-white">{promotion.title}</td>
                                                <td className="py-2 px-4 text-white">{promotion.promo_code}</td>
                                                <td className="py-2 px-4 text-white">
                                                    {promotion.discount_type === 'percentage' ? `${promotion.discount_value}%` : `₹${promotion.discount_value}`}
                                                </td>
                                                <td className="py-2 px-4 text-white">
                                                    {new Date(promotion.start_date).toLocaleDateString()}
                                                </td>
                                                <td className="py-2 px-4 text-white">
                                                    {new Date(promotion.end_date).toLocaleDateString()}
                                                </td>
                                                <td className="py-2 px-4 text-white">
                                                    <span
                                                        className={`inline-block px-2 py-1 rounded text-xs font-semibold ${status === 'Active' ? 'bg-green-100 text-green-700' :
                                                            status === 'Upcoming' ? 'bg-blue-100 text-blue-700' :
                                                                status === 'Expired' ? 'bg-red-100 text-red-700' :
                                                                    'bg-gray-100 text-gray-700'
                                                            }`}
                                                    >
                                                        {status}
                                                    </span>
                                                </td>
                                                <td className="py-2 px-4 text-white">
                                                    {promotion.banner_image ? (
                                                        <div className='relative w-16 h-16'>
                                                            <Image
                                                                src={promotion.banner_image}
                                                                alt={promotion.title}
                                                                fill
                                                                className="object-cover rounded"
                                                                onError={() => console.error(`Failed to load image: ${promotion.banner_image}`)}
                                                            />
                                                        </div>
                                                    ) : (
                                                        '-'
                                                    )}
                                                </td>
                                                <td className="py-2 px-4 text-white">
                                                    <button
                                                        onClick={() => handleEdit(promotion)}
                                                        className="edit bg-yellow-400 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-500 transition"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(promotion.id)}
                                                        className="delete bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="py-2 px-4 text-white text-center">No promotions found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Promotions;