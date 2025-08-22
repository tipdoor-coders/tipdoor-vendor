import Navbar from '@/components/Navbar'
import React from 'react'

const Home = () => {
  return (
    <>
      <div className="the-container flex bg-[linear-gradient(120deg,_#5e17eb,_#5f18eb66)]">

        <Navbar />

        <main className='flex-grow p-8 text-gray-800'>

          <h2 className='font-bold text-2xl m-5 text-white'>Welcome, Retailer!</h2>

          <div className="the-grid grid grid-cols-[repeat(auto-fit,_minmax(220px,_1fr))] gap-5 mb-7">

            <div className="card bg-white p-5 rounded-md shadow-xl">
              <h3 className='mb-2.5 font-bold text-lg text-slate-700'>Total Sales</h3>
              <p className='text-base text-neutral-600'>₹3,340</p>
            </div>

            <div className="card bg-white p-5 rounded-md shadow-xl">
              <h3 className='mb-2.5 font-bold text-lg text-slate-700'>Pending Orders</h3>
              <p className='text-base text-neutral-600'>6 Orders</p>
            </div>

            <div className="card bg-white p-5 rounded-md shadow-xl">
              <h3 className='mb-2.5 font-bold text-lg text-slate-700'>Low Stock Items</h3>
              <p className='text-base text-neutral-600'>3 Products</p>
            </div>

          </div>

          {/* <!-- Recent Orders (Static Placeholder) --> */}
          <div className="card card-recent bg-white p-5 rounded-md shadow-xl">
            <h3 className='mb-2.5 font-bold text-lg text-slate-700'>Recent Orders</h3>
            <ul>
              <li>[ORDER 1]</li>
              <li>[ORDER 2]</li>
              <li>[ORDER 3]</li>
              <li>[ORDER 4]</li>
            </ul>
          </div>



          {/* <!-- Products Sections --> */}
          <section className="brands-products">

            <h2 className='m-5 text-white font-bold text-2xl'>Products by Brand</h2>

            {/* <!-- Nike Section --> */}
            <div className="brand-group mt-10">

              <h3 className='mb-3.5 text-white font-bold text-xl'>Nike</h3>

              <table className="product-table w-full border-collapse mt-2.5 shadow-md">

                <thead>
                  <tr className='border-b border-gray-200 last:border-0'>
                    <th className='p-3 text-left bg-gray-100 text-gray-800'>Product</th>
                    <th className='p-3 text-left bg-gray-100 text-gray-800'>SKU</th>
                    <th className='p-3 text-left bg-gray-100 text-gray-800'>Price</th>
                    <th className='p-3 text-left bg-gray-100 text-gray-800'>Stock</th>
                    <th className='p-3 text-left bg-gray-100 text-gray-800'>Status</th>
                    <th className='p-3 text-left bg-gray-100 text-gray-800'>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className='border-b border-gray-200 last:border-0 bg-black/70 backdrop-blur-sm transition duration-300 ease-in-out transform hover:scale-[1.01] hover:bg-black/60'>
                    <td className='p-3 text-left text-white'>Nike Running Shoes</td>
                    <td className='p-3 text-left text-white'>NIKE-101</td>
                    <td className='p-3 text-left text-white'>₹3,499</td>
                    <td className='p-3 text-left text-white'>12</td>
                    <td className='p-3 text-left text-white'><span className="status inline-block px-2 py-1 rounded text-sm in-stock bg-green-100 text-green-600">In Stock</span></td>
                    <td className='p-3 text-left text-white'>
                      <button className="edit px-2.5 py-1.5 border-none rounded text-sm cursor-pointer bg-blue-500 hover:bg-blue-600 mr-1.5">Edit</button>
                      <button className="delete px-2.5 py-1.5 border-none rounded text-sm cursor-pointer bg-red-500 hover:bg-red-600">Delete</button>
                    </td>
                  </tr>
                  <tr className='border-b border-gray-200 last:border-0 bg-black/70 backdrop-blur-sm transition duration-300 ease-in-out transform hover:scale-[1.01] hover:bg-black/60'>
                    <td className='p-3 text-left text-white'>Nike Hoodie</td>
                    <td className='p-3 text-left text-white'>NIKE-102</td>
                    <td className='p-3 text-left text-white'>₹2,799</td>
                    <td className='p-3 text-left text-white'>5</td>
                    <td className='p-3 text-left text-white'><span className="status inline-block px-2 py-1 rounded text-sm in-stock bg-green-100 text-green-600">In Stock</span></td>
                    <td className='p-3 text-left text-white'>
                      <button className="edit px-2.5 py-1.5 border-none rounded text-sm cursor-pointer bg-blue-500 hover:bg-blue-600 mr-1.5">Edit</button>
                      <button className="delete px-2.5 py-1.5 border-none rounded text-sm cursor-pointer bg-red-500 hover:bg-red-600">Delete</button>
                    </td>
                  </tr>
                </tbody>

              </table>

            </div>

            {/* <!-- Zara Section --> */}
            <div className="brand-group mt-10">

              <h3 className='mb-3.5 text-white font-bold text-xl'>Zara</h3>

              <table className="product-table w-full border-collapse mt-2.5 shadow-md">

                <thead>
                  <tr className='border-b border-gray-200 last:border-0'>
                    <th className='p-3 text-left bg-gray-100 text-gray-800'>Product</th>
                    <th className='p-3 text-left bg-gray-100 text-gray-800'>SKU</th>
                    <th className='p-3 text-left bg-gray-100 text-gray-800'>Price</th>
                    <th className='p-3 text-left bg-gray-100 text-gray-800'>Stock</th>
                    <th className='p-3 text-left bg-gray-100 text-gray-800'>Status</th>
                    <th className='p-3 text-left bg-gray-100 text-gray-800'>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className='border-b border-gray-200 last:border-0 bg-black/70 backdrop-blur-sm transition duration-300 ease-in-out transform hover:scale-[1.01] hover:bg-black/60'>
                    <td className='p-3 text-left text-white'>Zara Denim Jacket</td>
                    <td className='p-3 text-left text-white'>ZARA-301</td>
                    <td className='p-3 text-left text-white'>₹2,299</td>
                    <td className='p-3 text-left text-white'>0</td>
                    <td className='p-3 text-left text-white'><span className="status inline-block px-2 py-1 rounded text-sm out-of-stock bg-red-100 text-red-500">Out of Stock</span></td>
                    <td className='p-3 text-left text-white'>
                      <button className="edit px-2.5 py-1.5 border-none rounded text-sm cursor-pointer bg-blue-500 hover:bg-blue-600 mr-1.5">Edit</button>
                      <button className="delete px-2.5 py-1.5 border-none rounded text-sm cursor-pointer bg-red-500 hover:bg-red-600">Delete</button>
                    </td>
                  </tr>
                  <tr className='border-b border-gray-200 last:border-0 bg-black/70 backdrop-blur-sm transition duration-300 ease-in-out transform hover:scale-[1.01] hover:bg-black/60'>
                    <td className='p-3 text-left text-white'>Zara Skirt</td>
                    <td className='p-3 text-left text-white'>ZARA-302</td>
                    <td className='p-3 text-left text-white'>₹1,499</td>
                    <td className='p-3 text-left text-white'>8</td>
                    <td className='p-3 text-left text-white'><span className="status inline-block px-2 py-1 rounded text-sm in-stock bg-green-100 text-green-600">In Stock</span></td>
                    <td className='p-3 text-left text-white'>
                      <button className="edit px-2.5 py-1.5 border-none rounded text-sm cursor-pointer bg-blue-500 hover:bg-blue-600 mr-1.5">Edit</button>
                      <button className="delete px-2.5 py-1.5 border-none rounded text-sm cursor-pointer bg-red-500 hover:bg-red-600">Delete</button>
                    </td>
                  </tr>
                </tbody>

              </table>

            </div>

            {/* <!-- Other Products --> */}
            <div className="brand-group mt-10">

              <h3 className='mb-3.5 text-white font-bold text-xl'>Other Products</h3>

              <table className="product-table w-full border-collapse mt-2.5 shadow-md">

                <thead>
                  <tr className='border-b border-gray-200 last:border-0'>
                    <th className='p-3 text-left bg-gray-100 text-gray-800'>Product</th>
                    <th className='p-3 text-left bg-gray-100 text-gray-800'>SKU</th>
                    <th className='p-3 text-left bg-gray-100 text-gray-800'>Price</th>
                    <th className='p-3 text-left bg-gray-100 text-gray-800'>Stock</th>
                    <th className='p-3 text-left bg-gray-100 text-gray-800'>Status</th>
                    <th className='p-3 text-left bg-gray-100 text-gray-800'>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className='border-b border-gray-200 last:border-0 bg-black/70 backdrop-blur-sm transition duration-300 ease-in-out transform hover:scale-[1.01] hover:bg-black/60'>
                    <td className='p-3 text-left text-white'>Basic T-Shirt</td>
                    <td className='p-3 text-left text-white'>GEN-101</td>
                    <td className='p-3 text-left text-white'>₹299</td>
                    <td className='p-3 text-left text-white'>30</td>
                    <td className='p-3 text-left text-white'><span className="status inline-block px-2 py-1 rounded text-sm in-stock bg-green-100 text-green-600">In Stock</span></td>
                    <td className='p-3 text-left text-white'>
                      <button className="edit px-2.5 py-1.5 border-none rounded text-sm cursor-pointer bg-blue-500 hover:bg-blue-600 mr-1.5">Edit</button>
                      <button className="delete px-2.5 py-1.5 border-none rounded text-sm cursor-pointer bg-red-500 hover:bg-red-600">Delete</button>
                    </td>
                  </tr>
                  <tr className='border-b border-gray-200 last:border-0 bg-black/70 backdrop-blur-sm transition duration-300 ease-in-out transform hover:scale-[1.01] hover:bg-black/60'>
                    <td className='p-3 text-left text-white'>Unbranded Socks</td>
                    <td className='p-3 text-left text-white'>GEN-102</td>
                    <td className='p-3 text-left text-white'>₹99</td>
                    <td className='p-3 text-left text-white'>100</td>
                    <td className='p-3 text-left text-white'><span className="status inline-block px-2 py-1 rounded text-sm in-stock bg-green-100 text-green-600">In Stock</span></td>
                    <td className='p-3 text-left text-white'>
                      <button className="edit px-2.5 py-1.5 border-none rounded text-sm cursor-pointer bg-blue-500 hover:bg-blue-600 mr-1.5">Edit</button>
                      <button className="delete px-2.5 py-1.5 border-none rounded text-sm cursor-pointer bg-red-500 hover:bg-red-600">Delete</button>
                    </td>
                  </tr>
                </tbody>

              </table>

            </div>

          </section>

        </main>
      </div>
    </>
  )
}

export default Home
