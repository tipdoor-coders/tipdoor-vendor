import React from 'react'
import NavLink from 'next/link'

const Footer = () => {
    return (
        <footer className='bg-[#333] text-[#fff] px-5 py-10'>
            <div className='footer-content flex justify-between flex-wrap mb-5'>
                {/* Site Links Section */}
                <div className='footer-section flex-1 min-w-[200px] mr-5'>
                    <h3 className='text-2xl mb-3.5 text-[#fff]'>Company</h3>
                    <ul className='list-none space-y-2.5'>
                        <li><NavLink href='#' className='text-[#bbb] no-underline text-base transition-colors duration-300 ease-in-out hover:text-[#fff]'>About Us</NavLink></li>
                        <li><NavLink href='#' className='text-[#bbb] no-underline text-base transition-colors duration-300 ease-in-out hover:text-[#fff]'>Careers</NavLink></li>
                        <li><NavLink href='#' className='text-[#bbb] no-underline text-base transition-colors duration-300 ease-in-out hover:text-[#fff]'>Privacy Policy</NavLink></li>
                        <li><NavLink href='#' className='text-[#bbb] no-underline text-base transition-colors duration-300 ease-in-out hover:text-[#fff]'>Terms of Service</NavLink></li>
                    </ul>
                </div>

                {/* Customer Service Section */}
                <div className='footer-section flex-1 min-w-[200px] mr-5'>
                    <h3 className='text-2xl mb-3.5 text-[#fff]'>Customer Service</h3>
                    <ul className='list-none space-y-2.5'>
                        <li><NavLink href='/contactUs' className='text-[#bbb] no-underline text-base transition-colors duration-300 ease-in-out hover:text-[#fff]'>Contact Us</NavLink></li>
                        <li><NavLink href='#' className='text-[#bbb] no-underline text-base transition-colors duration-300 ease-in-out hover:text-[#fff]'>FAQs</NavLink></li>
                        <li><NavLink href='#' className='text-[#bbb] no-underline text-base transition-colors duration-300 ease-in-out hover:text-[#fff]'>Returns</NavLink></li>
                        <li><NavLink href='#' className='text-[#bbb] no-underline text-base transition-colors duration-300 ease-in-out hover:text-[#fff]'>Shipping Info</NavLink></li>
                    </ul>
                </div>

                {/* Social Media Section */}
                <div className='footer-section flex-1 min-w-[200px] mr-5'>
                    <h3 className='text-2xl mb-3.5 text-[#fff]'>Follow Us</h3>
                    <ul className='list-none space-y-2.5 social-media flex gap-3.5'>
                        <li><NavLink href='#' className='facebook text-[#bbb] no-underline text-[1.2rem] transition-colors duration-300 ease-in-out hover:text-[#fff]'>Facebook</NavLink></li>
                        <li><NavLink href='#' className='twitter text-[#bbb] no-underline text-[1.2rem] transition-colors duration-300 ease-in-out hover:text-[#fff]'>Twitter</NavLink></li>
                        <li><NavLink href='#' className='instagram text-[#bbb] no-underline text-[1.2rem] transition-colors duration-300 ease-in-out hover:text-[#fff]'>Instagram</NavLink></li>
                        <li><NavLink href='#' className='youtube text-[#bbb] no-underline text-[1.2rem] transition-colors duration-300 ease-in-out hover:text-[#fff]'>YouTube</NavLink></li>
                    </ul>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className='footer-bottom text-center pt-5 border-t border-[#444]'>
                <p className='text-base text-[#bbb]'>&copy; 2025 TipDoor. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer
