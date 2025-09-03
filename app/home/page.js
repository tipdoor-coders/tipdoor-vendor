'use client';
import Navbar from '@/components/Navbar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    // Fetch vendor's products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) throw new Error('Please log in');
                const response = await axios.get('http://127.0.0.1:8000/api/vendor/products/', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProducts(response.data);
            } catch (err) {
                setError(err.response?.data?.detail || err.message);
            }
        };
        fetchProducts();
    }, []);

    return (
        <>
            <div className="the-container flex bg-[linear-gradient(120deg,_#5e17eb,_#5f18eb66)]">
                <Navbar />

                <main className="flex-grow p-8 text-gray-800">
                    <h2 className="font-bold text-2xl m-5 text-white">Welcome, Retailer!</h2>

                    {/* Dashboard Cards */}
                    <div className="the-grid grid grid-cols-[repeat(auto-fit,_minmax(220px,_1fr))] gap-5 mb-7">
                        <div className="card bg-white p-5 rounded-md shadow-xl">
                            <h3 className="mb-2.5 font-bold text-lg text-slate-700">Total Sales</h3>
                            <p className="text-base text-neutral-600">₹3,340</p>
                        </div>
                        <div className="card bg-white p-5 rounded-md shadow-xl">
                            <h3 className="mb-2.5 font-bold text-lg text-slate-700">Pending Orders</h3>
                            <p className="text-base text-neutral-600">6 Orders</p>
                        </div>
                        <div className="card bg-white p-5 rounded-md shadow-xl">
                            <h3 className="mb-2.5 font-bold text-lg text-slate-700">Low Stock Items</h3>
                            <p className="text-base text-neutral-600">3 Products</p>
                        </div>
                    </div>

                    {/* Recent Orders (Placeholder) */}
                    <div className="card card-recent bg-white p-5 rounded-md shadow-xl">
                        <h3 className="mb-2.5 font-bold text-lg text-slate-700">Recent Orders</h3>
                        <ul>
                            <li>[ORDER 1]</li>
                            <li>[ORDER 2]</li>
                            <li>[ORDER 3]</li>
                            <li>[ORDER 4]</li>
                        </ul>
                    </div>

                    {/* Product Management Section */}
                    <section className="brands-products mt-10">
                        <h2 className="m-5 text-white font-bold text-2xl">Your Products</h2>

                        {/* Products Table */}
                        <div className="brand-group">
                            <table className="product-table w-full border-collapse mt-2.5 shadow-md">
                                <thead>
                                    <tr className="border-b border-gray-200 last:border-0">
                                        <th className="p-3 text-left bg-gray-100 text-gray-800">Product</th>
                                        <th className="p-3 text-left bg-gray-100 text-gray-800">SKU</th>
                                        <th className="p-3 text-left bg-gray-100 text-gray-800">Price</th>
                                        <th className="p-3 text-left bg-gray-100 text-gray-800">Stock</th>
                                        <th className="p-3 text-left bg-gray-100 text-gray-800">Status</th>
                                        <th className="p-3 text-left bg-gray-100 text-gray-800">Published</th>
                                        <th className="p-3 text-left bg-gray-100 text-gray-800">Image</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr
                                            key={product.id}
                                            className="border-b border-gray-200 last:border-0 bg-black/70 backdrop-blur-sm transition duration-300 ease-in-out transform hover:scale-[1.01] hover:bg-black/60"
                                        >
                                            <td className="p-3 text-left text-white">{product.name}</td>
                                            <td className="p-3 text-left text-white">{product.sku}</td>
                                            <td className="p-3 text-left text-white">₹{product.price}</td>
                                            <td className="p-3 text-left text-white">{product.stock}</td>
                                            <td className="p-3 text-left text-white">
                                                <span
                                                    className={`status inline-block px-2 py-1 rounded text-sm ${
                                                        product.status === 'In Stock'
                                                            ? 'bg-green-100 text-green-600'
                                                            : 'bg-red-100 text-red-500'
                                                    }`}
                                                >
                                                    {product.status}
                                                </span>
                                            </td>
                                            <td className="p-3 text-left text-white">
                                                {product.is_published ? 'Yes' : 'No'}
                                            </td>
                                            <td className="p-3 text-left text-white">
                                                {product.image ? (
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-16 h-16 object-cover rounded"
                                                    />
                                                ) : (
                                                    '-'
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
};

export default Home;
