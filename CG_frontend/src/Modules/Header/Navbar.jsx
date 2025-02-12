import React from 'react'
import img from '../../assets/Navbar_Logo.png'
import Mobile_Navbar_Component from './Mobile_Navbar_Component'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <>
            {/* Desktop Namver Component */}
            <nav className='fixed top-0 left-0 right-0 z-50 max-lg:hidden'>

                {/* Logo */}
                <div className='absolute top-[-50px] left-10 xl:left-36 2xl:left-52'>
                    <img className='border-red-50 z-10' src={img} alt="" />
                </div>

                {/* Navigation Links */}
                <div className='text-[#5C21D0] py-2 pr-10 xl:pr-36 2xl:pr-62 bg-white'>
                    <ul className='flex justify-end space-x-10 font-small'>
                        <li className='cursor-pointer'>HOME</li>
                        <li className='cursor-pointer'>CG-Connect</li>
                        <li className='cursor-pointer'>CG-Clubs</li>
                        <Link to={'/newsletter'}>
                        <li className='cursor-pointer'>Newsletter</li>
                        </Link>
                        <li className='cursor-pointer'>Login</li>
                    </ul>
                </div>

                {/* Bottom Navbar */}
                <div className="bg-gradient-to-r from-[#5C21D0] to-[#3D0FAA] text-white py-5 pr-10 xl:pr-36 2xl:pr-62">
                    <ul className="flex justify-end space-x-10 font-medium">
                        <Link to={'/activity'}>
                        <li className="cursor-pointer">Student Activity ▼</li>
                        </Link>
                        <li className="cursor-pointer">Media Gallery</li>
                        <li className="cursor-pointer">Results</li>
                        <Link to={'/event'}>
                            <li className="cursor-pointer">Events</li>
                        </Link>
                        <li className="cursor-pointer">Student Projects</li>
                    </ul>
                </div>

            </nav>

            <div className="lg:hidden">
                <Mobile_Navbar_Component />
            </div>

            <Outlet />

        </>

    )
}

export default Navbar