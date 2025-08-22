import React from 'react'

const Header = () => {
  return (
    <header className='bg-white/95 px-5 py-2 flex items-center border-b border-[#ddd] sticky top-0 shadow-xs z-50'>
        <img className='mr-4 h-14' src="PNG.png" alt="TipDoor Vendor" />
        <h1 className='font-bold text-2xl text-slate-800'>TipDoor - Vendor</h1>
    </header>
  )
}

export default Header
