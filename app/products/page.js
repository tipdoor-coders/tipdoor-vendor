import Navbar from '@/components/Navbar'
import React from 'react'

const Products = () => {
    return (
        <>
            <div className="the-container flex bg-[linear-gradient(120deg,_#5e17eb,_#5f18eb66)]">

                <Navbar />

                <main className='flex-grow p-8 text-gray-800'>

                    <h2 className="text-2xl text-white font-semibold mb-6">Product Overview</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                        <div className="card bg-white rounded-lg shadow p-6 flex flex-col items-center">
                            <h3 className="text-lg font-semibold mb-2">Total Products</h3>
                            <p className="text-2xl font-bold text-blue-600">48</p>
                        </div>
                        <div className="card bg-white rounded-lg shadow p-6 flex flex-col items-center">
                            <h3 className="text-lg font-semibold mb-2">In Stock</h3>
                            <p className="text-2xl font-bold text-green-600">40</p>
                        </div>
                        <div className="card bg-white rounded-lg shadow p-6 flex flex-col items-center">
                            <h3 className="text-lg font-semibold mb-2">Low Stock</h3>
                            <p className="text-2xl font-bold text-yellow-600">5</p>
                        </div>
                        <div className="card bg-white rounded-lg shadow p-6 flex flex-col items-center">
                            <h3 className="text-lg font-semibold mb-2">Out of Stock</h3>
                            <p className="text-2xl font-bold text-red-600">3</p>
                        </div>
                    </div>

                    <div className="brand-group mt-10">
                        <h3 className="text-xl text-white font-semibold">All Products</h3>
                        <div className="mt-8">
                            <button
                                id="add-product-btn"
                                className="edit bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                            >
                                + Add Product
                            </button>
                        </div>
                        <div
                            id="add-product-form"
                            className="card bg-white rounded-lg shadow p-6 mt-6"
                            style={{ display: "none" }}
                        >
                            <h3 className="text-lg font-semibold mb-4">Add New Product</h3>
                            <form id="productForm">
                                <div className="flex flex-wrap gap-5">
                                    <div className="flex-1 min-w-[200px]">
                                        <label className="block font-medium mb-1">Product Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            className="w-full border border-gray-300 rounded px-3 py-2"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-[200px]">
                                        <label className="block font-medium mb-1">Brand</label>
                                        <input
                                            type="text"
                                            name="brand"
                                            required
                                            className="w-full border border-gray-300 rounded px-3 py-2"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-5 mt-3">
                                    <div className="flex-1 min-w-[200px]">
                                        <label className="block font-medium mb-1">SKU</label>
                                        <input
                                            type="text"
                                            name="sku"
                                            required
                                            className="w-full border border-gray-300 rounded px-3 py-2"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-[200px]">
                                        <label className="block font-medium mb-1">Price (₹)</label>
                                        <input
                                            type="number"
                                            name="price"
                                            required
                                            className="w-full border border-gray-300 rounded px-3 py-2"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-[200px]">
                                        <label className="block font-medium mb-1">Stock</label>
                                        <input
                                            type="number"
                                            name="stock"
                                            required
                                            className="w-full border border-gray-300 rounded px-3 py-2"
                                        />
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <button
                                        type="submit"
                                        className="edit bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mr-2"
                                    >
                                        Submit
                                    </button>
                                    <button
                                        type="button"
                                        id="cancel-form"
                                        className="delete bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>

                        <table className="product-table w-full mt-10 border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="py-3 px-4 text-left font-semibold">Product</th>
                                    <th className="py-3 px-4 text-left font-semibold">Brand</th>
                                    <th className="py-3 px-4 text-left font-semibold">SKU</th>
                                    <th className="py-3 px-4 text-left font-semibold">Price</th>
                                    <th className="py-3 px-4 text-left font-semibold">Stock</th>
                                    <th className="py-3 px-4 text-left font-semibold">Status</th>
                                    <th className="py-3 px-4 text-left font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-200 last:border-0 bg-black/70 backdrop-blur-sm transition duration-300 ease-in-out transform hover:scale-[1.01] hover:bg-black/60">
                                    <td className="py-2 px-4 text-white">Nike Running Shoes</td>
                                    <td className="py-2 px-4 text-white">Nike</td>
                                    <td className="py-2 px-4 text-white">NIKE-101</td>
                                    <td className="py-2 px-4 text-white">₹3,499</td>
                                    <td className="py-2 px-4 text-white">12</td>
                                    <td className="py-2 px-4 text-white">
                                        <span className="status in-stock inline-block px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-semibold">
                                            In Stock
                                        </span>
                                    </td>
                                    <td className="py-2 px-4 text-white">
                                        <button className="edit bg-yellow-400 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-500 transition">
                                            Edit
                                        </button>
                                        <button className="delete bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200 last:border-0 bg-black/70 backdrop-blur-sm transition duration-300 ease-in-out transform hover:scale-[1.01] hover:bg-black/60">
                                    <td className="py-2 px-4 text-white">Zara Denim Jacket</td>
                                    <td className="py-2 px-4 text-white">Zara</td>
                                    <td className="py-2 px-4 text-white">ZARA-301</td>
                                    <td className="py-2 px-4 text-white">₹2,299</td>
                                    <td className="py-2 px-4 text-white">0</td>
                                    <td className="py-2 px-4 text-white">
                                        <span className="status out-of-stock inline-block px-2 py-1 rounded bg-red-100 text-red-700 text-xs font-semibold">
                                            Out of Stock
                                        </span>
                                    </td>
                                    <td className="py-2 px-4 text-white">
                                        <button className="edit bg-yellow-400 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-500 transition">
                                            Edit
                                        </button>
                                        <button className="delete bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                                <tr className='border-b border-gray-200 last:border-0 bg-black/70 backdrop-blur-sm transition duration-300 ease-in-out transform hover:scale-[1.01] hover:bg-black/60'>
                                    <td className="py-2 px-4 text-white">Basic T-Shirt</td>
                                    <td className="py-2 px-4 text-white">Generic</td>
                                    <td className="py-2 px-4 text-white">GEN-101</td>
                                    <td className="py-2 px-4 text-white">₹299</td>
                                    <td className="py-2 px-4 text-white">30</td>
                                    <td className="py-2 px-4 text-white">
                                        <span className="status in-stock inline-block px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-semibold">
                                            In Stock
                                        </span>
                                    </td>
                                    <td className="py-2 px-4 text-white">
                                        <button className="edit bg-yellow-400 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-500 transition">
                                            Edit
                                        </button>
                                        <button className="delete bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                                {/* Add more product rows as needed */}
                            </tbody>
                        </table>
                    </div>

                </main>

            </div>
        </>
    )
}

export default Products
