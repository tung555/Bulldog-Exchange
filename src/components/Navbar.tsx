'use client';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/logo.png';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  return (
    <nav className="bg-white border-b border-gray-200 z-10">
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
            <Link href="/" className="text-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2">
              Home
            </Link>
            <Link href="/MarketPlace" className="text-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2">
              Marketplace
            </Link>
            <Link href="/about" className="text-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2">
              About
            </Link>
            <Link href="/contact" className="text-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2">
              Contact
            </Link>

            {session?.user && (
              <Link href="/my-items" className="text-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2">
                My Items
              </Link>
            )}
          </div>

          {/* Right Side Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {!session ? (
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
            <>
              <Link
              href="/profile"
              className="text-black hover:text-gray-400"
              >
                Hello, {session.user.name?.split(' ')[0] || 'User'}
              </Link>

              <button
              onClick={handleLogout}
              className="text-white bg-black hover:bg-gray-500 hover:text-white rounded-md px-3 py-2"
              >
                Logout
              </button>
            </>

            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
