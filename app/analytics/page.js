'use client';
import Navbar from '@/components/Navbar';
import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Tooltip, Legend } from 'chart.js';
import { fetchWithAuth } from '@/lib/api';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Tooltip, Legend);

const Analytics = () => {
    const [orderItems, setOrderItems] = useState([]);
    const [stats, setStats] = useState({
        totalSales: 0,
        totalOrders: 0,
        totalCustomers: 0,
    });
    const [error, setError] = useState(null);

    // Chart data states
    const [topProductsData, setTopProductsData] = useState({});
    const [salesTrendData, setSalesTrendData] = useState({});
    const [statusBreakdownData, setStatusBreakdownData] = useState({});

    // Fetch order items and compute analytics
    useEffect(() => {
        const fetchOrderItems = async () => {
            try {
                const response = await fetchWithAuth('vendor/orders/');
                console.log('Fetched order items:', response);
                setOrderItems(response);

                // Compute stats
                const totalSales = response.reduce((sum, item) => sum + item.price * item.quantity, 0);
                const uniqueOrderIds = [...new Set(response.map(item => item.order_id))];
                const uniqueCustomerIds = [...new Set(response.map(item => item.order_id))]; // Assuming order_id is unique per customer order
                setStats({
                    totalSales,
                    totalOrders: uniqueOrderIds.length,
                    totalCustomers: uniqueCustomerIds.length, // Adjust if customer ID is available
                });

                // Top Selling Products (Bar)
                const productQuantities = response.reduce((acc, item) => {
                    acc[item.product_name] = (acc[item.product_name] || 0) + item.quantity;
                    return acc;
                }, {});
                const topProducts = Object.entries(productQuantities)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 5); // Top 5 products
                setTopProductsData({
                    labels: topProducts.map(([name]) => name),
                    datasets: [{
                        label: 'Quantity Sold',
                        data: topProducts.map(([, qty]) => qty),
                        backgroundColor: 'rgba(37, 99, 235, 0.6)', // blue-600
                        borderColor: 'rgba(37, 99, 235, 1)',
                        borderWidth: 1,
                    }],
                });

                // Sales Trend Over Days (Line)
                const salesByDate = response.reduce((acc, item) => {
                    const date = new Date(item.order_date).toLocaleDateString();
                    acc[date] = (acc[date] || 0) + (item.price * item.quantity);
                    return acc;
                }, {});
                const sortedDates = Object.keys(salesByDate).sort((a, b) => new Date(a) - new Date(b));
                setSalesTrendData({
                    labels: sortedDates,
                    datasets: [{
                        label: 'Daily Sales (₹)',
                        data: sortedDates.map(date => salesByDate[date]),
                        fill: false,
                        borderColor: 'rgba(34, 197, 94, 1)', // green-600
                        tension: 0.1,
                    }],
                });

                // Status Breakdown (Pie)
                const statusCounts = response.reduce((acc, item) => {
                    acc[item.order_status] = (acc[item.order_status] || 0) + 1;
                    return acc;
                }, {});
                setStatusBreakdownData({
                    labels: Object.keys(statusCounts),
                    datasets: [{
                        label: 'Order Status',
                        data: Object.values(statusCounts),
                        backgroundColor: [
                            'rgba(234, 179, 8, 0.6)', // yellow-600 for pending
                            'rgba(34, 197, 94, 0.6)', // green-600 for shipped
                            'rgba(239, 68, 68, 0.6)', // red-600 for cancelled
                        ],
                        borderColor: [
                            'rgba(234, 179, 8, 1)',
                            'rgba(34, 197, 94, 1)',
                            'rgba(239, 68, 68, 1)',
                        ],
                        borderWidth: 1,
                    }],
                });
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err.message || 'Failed to load order data.');
            }
        };
        fetchOrderItems();
    }, []);

    // Chart options
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    return (
        <>
            <div className="the-container flex bg-[linear-gradient(120deg,_#5e17eb,_#5f18eb66)]">
                <Navbar />
                <main className='flex-grow p-8 text-gray-800'>
                    <h2 className="text-2xl text-white font-semibold mb-6">Analytics Overview</h2>
                    {error && <p className="text-red-500 mb-4">{JSON.stringify(error)}</p>}

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                        <div className="card bg-white rounded-lg shadow p-6 flex flex-col items-center">
                            <h3 className="text-lg font-semibold mb-2">Total Sales</h3>
                            <p className="text-2xl font-bold text-blue-600">₹{stats.totalSales.toFixed(2)}</p>
                        </div>
                        <div className="card bg-white rounded-lg shadow p-6 flex flex-col items-center">
                            <h3 className="text-lg font-semibold mb-2">Orders</h3>
                            <p className="text-2xl font-bold text-green-600">{stats.totalOrders}</p>
                        </div>
                        <div className="card bg-white rounded-lg shadow p-6 flex flex-col items-center">
                            <h3 className="text-lg font-semibold mb-2">Customers</h3>
                            <p className="text-2xl font-bold text-yellow-600">{stats.totalCustomers}</p>
                        </div>
                    </div>

                    <div className="brand-group mt-10">
                        <h3 className="text-xl text-white font-semibold mb-4">Top Selling Products</h3>
                        <div className="bg-white rounded-lg shadow p-6 min-h-[200px]">
                            {topProductsData.labels ? (
                                <Bar data={topProductsData} options={chartOptions} />
                            ) : (
                                <span className="text-gray-400">No data available</span>
                            )}
                        </div>
                    </div>

                    <div className="brand-group mt-10">
                        <h3 className="text-xl text-white font-semibold mb-4">Sales Trend Over Days</h3>
                        <div className="bg-white rounded-lg shadow p-6 min-h-[200px]">
                            {salesTrendData.labels ? (
                                <Line data={salesTrendData} options={chartOptions} />
                            ) : (
                                <span className="text-gray-400">No data available</span>
                            )}
                        </div>
                    </div>

                    <div className="brand-group mt-10">
                        <h3 className="text-xl text-white font-semibold mb-4">Status Breakdown</h3>
                        <div className="bg-white rounded-lg shadow p-6 min-h-[200px] max-w-[800px] flex items-center justify-center">
                            {statusBreakdownData.labels ? (
                                <Pie data={statusBreakdownData} options={chartOptions} />
                            ) : (
                                <span className="text-gray-400">No data available</span>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Analytics;