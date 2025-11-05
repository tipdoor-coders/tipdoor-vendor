'use client';
import Navbar from '@/components/Navbar';
import React, { useState, useEffect } from 'react';
import { fetchWithAuth } from '@/lib/api';

const Orders = () => {
    const [orderItems, setOrderItems] = useState([]);
    const [stats, setStats] = useState({
        totalOrders: 0,
        pendingOrders: 0,
        shippedOrders: 0,
        cancelledOrders: 0,
    });
    const [error, setError] = useState(null);

    // Fetch vendor's order items and calculate stats
    useEffect(() => {
        const fetchOrderItems = async () => {
            try {
                const response = await fetchWithAuth('vendor/orders/');
                console.log('Fetched order items:', response);
                setOrderItems(response);

                // Calculate stats
                const uniqueOrderIds = [...new Set(response.map(item => item.order_id))];
                const pending = response.filter(item => item.order_status === 'pending').length;
                const shipped = response.filter(item => item.order_status === 'shipped').length;
                const cancelled = response.filter(item => item.order_status === 'cancelled').length;
                setStats({
                    totalOrders: uniqueOrderIds.length,
                    pendingOrders: pending,
                    shippedOrders: shipped,
                    cancelledOrders: cancelled,
                });
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err.message === 'Session expired' ? 'Your session has expired. Please log in again.' : err.message);
            }
        };
        fetchOrderItems();
    }, []);

    // Handle cancel order
    const handleCancel = async (orderId) => {
        try {
            console.log(`Sending POST to /api/shop/vendor/orders/${orderId}/cancel/`);
            await fetchWithAuth(`vendor/orders/${orderId}/cancel/`, { method: 'POST' });

            // Update local state
            setOrderItems(prevItems =>
                prevItems.map(item =>
                    item.order_id === orderId ? { ...item, order_status: 'cancelled' } : item
                )
            );

            // Recalculate stats
            setStats(prev => ({
                ...prev,
                pendingOrders: prev.pendingOrders - orderItems.filter(item => item.order_id === orderId && item.order_status === 'pending').length,
                cancelledOrders: prev.cancelledOrders + orderItems.filter(item => item.order_id === orderId).length,
            }));

            setError(null);
        } catch (err) {
            console.error('Cancel error:', err);
            setError(err.message === 'Session expired' ? 'Your session has expired. Please log in again.' : err.message);
        }
    };

    // Handle view order details
    const handleView = (orderId) => {
        const items = orderItems.filter(item => item.order_id === orderId);
        const details = items.map(item =>
            `Product: ${item.product_name}, SKU: ${item.product_sku}, Quantity: ${item.quantity}, Price: ₹${item.price}`
        ).join('\n');
        alert(`Order #${orderId}\nCustomer: ${items[0]?.customer_name || 'Unknown'}\nDate: ${items[0] ? new Date(items[0].order_date).toLocaleDateString() : '-'}\nStatus: ${items[0]?.order_status || '-'}\n\nItems:\n${details}`);
    };

    // Group order items by order_id for table display
    const groupedOrders = [];
    const seenOrderIds = new Set();
    for (const item of orderItems) {
        if (!seenOrderIds.has(item.order_id)) {
            seenOrderIds.add(item.order_id);
            const itemsForOrder = orderItems.filter(i => i.order_id === item.order_id);
            const total = itemsForOrder.reduce((sum, i) => sum + (i.price * i.quantity), 0);
            groupedOrders.push({
                order_id: item.order_id,
                customer_name: item.customer_name,
                order_date: item.order_date,
                order_status: item.order_status,
                total,
            });
        }
    }

    return (
        <>
            <div className="the-container flex bg-[linear-gradient(120deg,_#5e17eb,_#5f18eb66)]">
                <Navbar />
                <main className='flex-grow p-8 text-gray-800'>
                    <h2 className="text-2xl text-white font-semibold mb-6">Order Summary</h2>
                    {error && <p className="text-red-500 mb-4 bg-amber-50 p-2 rounded-md">{JSON.stringify(error)}</p>}

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                        <div className="card bg-white rounded-lg shadow p-6 flex flex-col items-center">
                            <h3 className="text-lg font-semibold mb-2">Total Orders</h3>
                            <p id="total-orders" className="text-2xl font-bold text-blue-600">{stats.totalOrders}</p>
                        </div>
                        <div className="card bg-white rounded-lg shadow p-6 flex flex-col items-center">
                            <h3 className="text-lg font-semibold mb-2">Pending</h3>
                            <p id="pending-orders" className="text-2xl font-bold text-yellow-600">{stats.pendingOrders} Orders</p>
                        </div>
                        <div className="card bg-white rounded-lg shadow p-6 flex flex-col items-center">
                            <h3 className="text-lg font-semibold mb-2">Shipped</h3>
                            <p id="shipped-orders" className="text-2xl font-bold text-green-600">{stats.shippedOrders} Orders</p>
                        </div>
                        <div className="card bg-white rounded-lg shadow p-6 flex flex-col items-center">
                            <h3 className="text-lg font-semibold mb-2">Cancelled</h3>
                            <p id="cancelled-orders" className="text-2xl font-bold text-red-600">{stats.cancelledOrders} Orders</p>
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
                                {groupedOrders.length > 0 ? (
                                    groupedOrders.map((order) => (
                                        <tr
                                            key={order.order_id}
                                            className="border-b border-gray-200 last:border-0 bg-black/70 backdrop-blur-sm transition duration-300 ease-in-out transform hover:scale-[1.01] hover:bg-black/60"
                                        >
                                            <td className="py-2 px-4 text-white">#{order.order_id}</td>
                                            <td className="py-2 px-4 text-white">{order.customer_name || 'Unknown'}</td>
                                            <td className="py-2 px-4 text-white">{new Date(order.order_date).toLocaleDateString()}</td>
                                            <td className="py-2 px-4 text-white">
                                                <span
                                                    className={`status inline-block px-2 py-1 rounded text-xs font-semibold ${order.order_status === 'shipped'
                                                        ? 'bg-green-100 text-green-700'
                                                        : order.order_status === 'pending'
                                                            ? 'bg-yellow-100 text-yellow-700'
                                                            : 'bg-gray-200 text-gray-700'
                                                        }`}
                                                >
                                                    {order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="py-2 px-4 text-white">₹{order.total.toFixed(2)}</td>
                                            <td className="py-2 px-4 text-white">
                                                <button
                                                    onClick={() => handleView(order.order_id)}
                                                    className="edit bg-blue-600 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700 transition"
                                                >
                                                    View
                                                </button>
                                                {order.order_status === 'Pending' && (
                                                    <button
                                                        onClick={() => handleCancel(order.order_id)}
                                                        className="delete bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                                    >
                                                        Cancel
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="py-2 px-4 text-white text-center">No orders found.</td>
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

export default Orders;