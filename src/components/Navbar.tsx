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
    <nav className="bg-white border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image className="h-20 w-auto" src={logo} alt="Bulldog Exchange logo" />
            <span className="hidden md:block text-black text-2xl font-bold ml-2">
              Bulldog Exchange
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-4">
            <Link
              href="/"
              className="text-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
            >
              Contact
            </Link>
          </div>

          {/* Right Side Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {!isLoggedIn ? (
              <>
                <Link
                  href="/login"
                  className="text-white bg-[#D13030] hover:bg-[#E35555] hover:text-white rounded-md px-3 py-2"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="text-white bg-black hover:bg-gray-500 hover:text-white rounded-md px-3 py-2"
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
