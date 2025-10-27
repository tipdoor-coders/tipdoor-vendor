import React from 'react'
import Image from 'next/image'

const Header = () => {
  return (
    <header className='bg-white/70 backdrop-blur-md px-5 py-2 flex items-center max-md:justify-center border-b border-[#ddd] sticky top-0 shadow-xs z-50'>
      <div className="relative mr-4 h-14 w-14">
        <Image
          src="/PNG.png"
          alt="TipDoor Vendor"
          fill
          sizes="56px"
          className="object-contain"
          priority
        />
      </div>
      <h1 className='font-bold text-2xl text-slate-800'>TipDoor - Vendor</h1>
    </header>
  )
}

export default Header
