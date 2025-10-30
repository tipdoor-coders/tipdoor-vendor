'use client';
import Navbar from '@/components/Navbar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [stats, setStats] = useState({
        totalSales: 0,
        pendingOrders: 0,
        lowStockItems: 0,
        totalOrders: 0,
    });
    const [recentOrders, setRecentOrders] = useState([]);
    const [error, setError] = useState(null);

    // Fetch vendor's products
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) throw new Error('Please log in');

                // fetch products
                const productsResponse = await axios.get('http://127.0.0.1:8000/api/vendor/products/', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProducts(productsResponse.data);

                // Fetch orders
                const ordersResponse = await axios.get('http://127.0.0.1:8000/api/vendor/orders/', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log('Fetched orders:', ordersResponse.data);
                setOrders(ordersResponse.data);

                // Calculate stats
                const lowStockItems = productsResponse.data.filter(product =>
                    product.status === 'Low Stock' || product.status === 'low stock'
                ).length;

                const totalSales = ordersResponse.data.reduce((total, order) => {
                    return total + (parseFloat(order.price) * order.quantity);
                }, 0);

                const pendingOrders = ordersResponse.data.filter(order =>
                    order.order_status?.toLowerCase() === 'pending'
                ).length;

                const uniqueOrderIds = [...new Set(ordersResponse.data.map(item => item.order_id))];

                // Get recent orders (last 5 unique orders)
                const recentOrdersData = ordersResponse.data
                    .filter((order, index, self) =>
                        index === self.findIndex(o => o.order_id === order.order_id)
                    )
                    .sort((a, b) => new Date(b.order_date) - new Date(a.order_date))
                    .slice(0, 5);

                setStats({
                    totalSales: totalSales,
                    pendingOrders: pendingOrders,
                    lowStockItems: lowStockItems,
                    totalOrders: uniqueOrderIds.length,
                });

                setRecentOrders(recentOrdersData);

            } catch (err) {
                const errorMsg = err.response?.data?.detail || err.message;
                console.error('Fetch error:', err);
                setError(errorMsg);
            }
        };
        fetchDashboardData();
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
                            <p className="text-base text-neutral-600">₹{stats.totalSales.toLocaleString('en-IN')}</p>
                        </div>
                        <div className="card bg-white p-5 rounded-md shadow-xl">
                            <h3 className="mb-2.5 font-bold text-lg text-slate-700">Pending Orders</h3>
                            <p className="text-base text-neutral-600">{stats.pendingOrders} Orders</p>
                        </div>
                        <div className="card bg-white p-5 rounded-md shadow-xl">
                            <h3 className="mb-2.5 font-bold text-lg text-slate-700">Low Stock Items</h3>
                            <p className="text-base text-neutral-600">{stats.lowStockItems} Products</p>
                        </div>
                        <div className="card bg-white p-5 rounded-md shadow-xl">
                            <h3 className="mb-2.5 font-bold text-lg text-slate-700">Total Orders</h3>
                            <p className="text-base text-neutral-600">
                                {stats.totalOrders} Orders
                            </p>
                        </div>

                    </div>

                    {/* Recent Orders */}
                    <div className="card card-recent bg-white p-5 rounded-md shadow-xl">
                        <h3 className="mb-2.5 font-bold text-lg text-slate-700">Recent Orders</h3>
                        {recentOrders.length > 0 ? (
                            <ul className="space-y-3">
                                {recentOrders.map((order) => (
                                    <li key={order.order_id} className="flex justify-between items-center p-3 border-b border-gray-100 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                                        <div className="flex-1">
                                            <p className="font-medium text-slate-800">Order #{order.order_id}</p>
                                            <p className="text-sm text-gray-600 mt-1">
                                                {order.product_name} × {order.quantity}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {new Date(order.order_date).toLocaleDateString('en-IN', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-slate-800">
                                                ₹{(parseFloat(order.price) * order.quantity).toLocaleString('en-IN')}
                                            </p>
                                            <span className={`inline-block mt-1 text-xs px-2 py-1 rounded-full font-medium ${order.order_status?.toLowerCase() === 'delivered' ? 'bg-green-100 text-green-700' :
                                                    order.order_status?.toLowerCase() === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                        order.order_status?.toLowerCase() === 'cancelled' ? 'bg-red-100 text-red-700' :
                                                            order.order_status?.toLowerCase() === 'shipped' ? 'bg-blue-100 text-blue-700' :
                                                                'bg-gray-100 text-gray-700'
                                                }`}>
                                                {order.order_status}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-center py-8">
                                <div className="text-gray-400 mb-2">
                                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                                <p className="text-gray-500 text-sm">No recent orders found</p>
                            </div>
                        )}
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
                                                    className={`status inline-block px-2 py-1 rounded text-sm ${product.status === 'In Stock'
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
                                                    <div className='relative w-16 h-16'>
                                                        <Image
                                                            src={product.image}
                                                            alt={product.name}
                                                            className="object-cover rounded"
                                                            sizes="64px"
                                                        />
                                                    </div>
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
