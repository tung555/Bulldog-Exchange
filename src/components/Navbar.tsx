'use client';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/logo.png';
import { useState } from 'react';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <nav className='bg-white-700 border-b-1 border-white'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 bg-white' >
        <div className='relative flex h-20 items-center justify-between'>
          
          <Image className='h-20 w-auto' src={logo} alt='Bulldog Exchange logo' />
          <div className='absolute inset-y-0 right-0 flex items-center md:hidden'>
            
            {/* <!-- Mobile menu button - hamburger --> */}
            
              

              <button
              type='button'
              id='mobile-dropdown-button'
              className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
              aria-controls='mobile-menu'
              aria-expanded='false'
            >
              <span className='absolute -inset-0.5'></span>
              <span className='sr-only'>Open main menu</span>
              <svg
                className='block h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                />
              </svg>
            </button>
          </div>

          <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start bg-white' >
            {/* <!-- Logo --> */}
            <a className='flex flex-shrink-0 items-center' href='#'>
              

              <span className='hidden md:block text-black text-2xl font-bold ml-2'>
                Bulldog Exchange
              </span>
            </a>
            {/* <!-- Desktop Menu Hidden below md screens --> */}
            <div className='hidden md:ml-6 md:block'>
              <div className='flex space-x-2'>
                <a
                  href='/'
                  className='text-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="text-black bg-gray-300 hover:bg-gray-400 hover:text-white rounded-md px-3 py-2"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="text-black bg-gray-300 hover:bg-gray-400 hover:text-white rounded-md px-3 py-2"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
