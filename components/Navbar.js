'use client'
import React from 'react'
import NavLink from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const pathname = usePathname();

  const isActive = (path) => {
    return pathname === path
  }

  const baseClass = 'text-white py-3.5 px-5 transition-colors duration-300 ease-in-out hover:bg-slate-600';

  const getNavClass = (path) => {
    return `${baseClass} ${isActive(path) ? 'bg-slate-600' : ''
      }`
  }

  return (
    <nav className='w-56 bg-slate-700 flex flex-col sticky top-16 h-[91vh] overflow-y-auto'>

      <NavLink href='/home' className={getNavClass('/home')}>Dashboard</NavLink>

      <NavLink href="/products" className={getNavClass('/products')}>Products</NavLink>

      <NavLink href="/orders" className={getNavClass('/orders')}>Orders</NavLink>

      <NavLink href="/analytics" className={getNavClass('/analytics')}>Analytics</NavLink>

      <NavLink href="/promotions" className={getNavClass('/promotions')}>Promotions</NavLink>

      <NavLink href="/settings" className={getNavClass('/settings')}>Settings</NavLink>

    </nav>
  )
}

export default Navbar
