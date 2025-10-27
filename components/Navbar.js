'use client'
import React, { useState, useEffect } from 'react'
import NavLink from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
    router.push('/login');
  }

  const baseClass = 'text-white py-3.5 px-5 transition-colors duration-300 ease-in-out hover:bg-slate-600';
  const getNavClass = (path) => `${baseClass} ${pathname === path ? 'bg-slate-600' : ''}`;

  return (
    <nav className='w-56 bg-slate-700 flex flex-col justify-between sticky top-16 h-[90vh] overflow-y-auto'>

      {/* Regular NavLinks */}
      <div className='flex flex-col'>
        <NavLink href='/home' className={getNavClass('/home')}>Dashboard</NavLink>
        <NavLink href="/products" className={getNavClass('/products')}>Products</NavLink>
        <NavLink href="/orders" className={getNavClass('/orders')}>Orders</NavLink>
        <NavLink href="/analytics" className={getNavClass('/analytics')}>Analytics</NavLink>
        <NavLink href="/promotions" className={getNavClass('/promotions')}>Promotions</NavLink>
        <NavLink href="/settings" className={getNavClass('/settings')}>Settings</NavLink>
      </div>

      {/* Auth Section at bottom */}
      <div className='py-5 text-xl font-semibold px-3'>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="w-full text-left text-white py-3.5 px-5 transition-colors duration-300 ease-in-out hover:bg-red-600 bg-red-700 cursor-pointer"
          >
            Logout
          </button>
        ) : (
          <NavLink
            href="/login"
            className={getNavClass('/login') + ' hover:bg-green-600 rounded-2xl'}
          >
            Login
          </NavLink>
        )}
      </div>

    </nav>
  )
}

export default Navbar
