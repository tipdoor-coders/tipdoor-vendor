'use client';
import Navbar from '@/components/Navbar'
import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { fetchWithAuth } from '@/lib/api';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        sku: '',
        price: '',
        stock: '',
        image: null,
        is_published: true,
    });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState(null);

    // Fetch vendor's products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetchWithAuth('vendor/products/');
                setProducts(response.data);
            } catch (err) {
                console.error(err);
                setError(err.message || 'Failed to fetch products');
            }
        };
        fetchProducts();
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    // Handle checkbox change
    const handleCheckboxChange = (e) => {
        setFormData({ ...formData, is_published: e.target.checked });
    };

    // Handle add/edit product
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            for (const key in formData) {
                if (formData[key] !== null) {
                    data.append(key, formData[key]);
                }
            }

            if (editingId) {
                // Update product
                const response = await fetchWithAuth(`products/${editingId}`, {
                    method: 'PUT',
                    body: data,
                    headers: { Authorization: `Bearer ${localStorage.getItem('access')}` },
                });
                setProducts(products.map((p) => (p.id === editingId ? response : p)));
                setEditingId(null);
            } else {
                // Create product
                const response = await fetchWithAuth('vendor/products/', {
                    method: 'POST',
                    body: data,
                    headers: { Authorization: `Bearer ${localStorage.getItem('access')}` },
                });
                setProducts([...products, response]);
            }
            setFormData({ name: '', sku: '', price: '', stock: '', image: null, is_published: true });
            setError(null);
        } catch (err) {
            console.error('Submit error: ', err)
            setError(err.message || 'Failed to save product');
        }
    };

    // Handle edit button
    const handleEdit = (product) => {
        setEditingId(product.id);
        setFormData({
            name: product.name,
            sku: product.sku,
            price: product.price,
            stock: product.stock,
            image: null, // File input reset
            is_published: product.is_published,
        });
    };

    // Handle delete button
    const handleDelete = async (id) => {
        try {
            await fetchWithAuth(`products/${id}`, {
                method: 'DELETE',
            });
            setProducts(products.filter((p) => p.id !== id));
            setError(null);
        } catch (err) {
            console.error('Delete error:', err);
            setError(err.message || 'Failed to delete product');
        }
    };

    // Handle publish/unpublish
    const handlePublishToggle = async (id, publish) => {
        try {
            const endpoint = publish
                ? `vendor/products/${id}/publish/`
                : `vendor/products/${id}/unpublish/`;

            await fetchWithAuth(endpoint, { method: 'POST' });

            setProducts(products.map((p) => (p.id === id ? { ...p, is_published: publish } : p)));
            setError(null);
        } catch (err) {
            console.error('Publish toggle error:', err);
            setError(err.message || 'Failed to update publish status');
        }
    };

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

                    {/* Product Management Section */}
                    <section className="brands-products mt-10">
                        <h2 className="m-5 text-white font-bold text-2xl">Manage Products</h2>

                        {/* Add/Edit Product Form */}
                        <div className="card bg-white p-5 rounded-md shadow-xl mb-7">
                            <h3 className="mb-2.5 font-bold text-lg text-slate-700">
                                {editingId ? 'Edit Product' : 'Add New Product'}
                            </h3>
                            {error && <p className="text-red-500 mb-4">{JSON.stringify(error)}</p>}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Product Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Product Name"
                                        required
                                        className="border p-2 w-full rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">SKU</label>
                                    <input
                                        type="text"
                                        name="sku"
                                        value={formData.sku}
                                        onChange={handleChange}
                                        placeholder="SKU"
                                        required
                                        className="border p-2 w-full rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        placeholder="Price"
                                        required
                                        step="0.01"
                                        className="border p-2 w-full rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Stock</label>
                                    <input
                                        type="number"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        placeholder="Stock"
                                        required
                                        className="border p-2 w-full rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Image</label>
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={handleChange}
                                        accept="image/*"
                                        className="border p-2 w-full rounded-md"
                                    />
                                    {editingId && formData.image === null && products.find(p => p.id === editingId)?.image && (
                                        <p className="text-sm text-gray-500 mt-1">
                                            Current image: {products.find(p => p.id === editingId).image}
                                        </p>
                                    )}
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="is_published"
                                        checked={formData.is_published}
                                        onChange={handleCheckboxChange}
                                        className="mr-2"
                                    />
                                    <label className="text-sm font-medium text-gray-700">Published</label>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                    >
                                        {editingId ? 'Update Product' : 'Add Product'}
                                    </button>
                                    {editingId && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setEditingId(null);
                                                setFormData({ name: '', sku: '', price: '', stock: '', image: null, is_published: true });
                                            }}
                                            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>

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
                                        <th className="p-3 text-left bg-gray-100 text-gray-800">Actions</th>
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
                                                        : product.status === 'Low Stock'
                                                            ? 'bg-yellow-100 text-yellow-600'
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
                                                    <Image
                                                        src={product.image}
                                                        alt={product.name}
                                                        width={64}
                                                        height={64}
                                                        className="object-cover rounded"
                                                    />
                                                ) : (
                                                    '-'
                                                )}
                                            </td>
                                            <td className="p-3 text-left text-white">
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className="edit px-2.5 py-1.5 border-none rounded text-sm cursor-pointer bg-blue-500 hover:bg-blue-600 mr-1.5"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="delete px-2.5 py-1.5 border-none rounded text-sm cursor-pointer bg-red-500 hover:bg-red-600 mr-1.5"
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    onClick={() => handlePublishToggle(product.id, !product.is_published)}
                                                    className={`px-2.5 py-1.5 border-none rounded text-sm cursor-pointer ${product.is_published ? 'bg-gray-500 hover:bg-gray-600' : 'bg-green-500 hover:bg-green-600'
                                                        }`}
                                                >
                                                    {product.is_published ? 'Unpublish' : 'Publish'}
                                                </button>
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
    )
}

export default Products
