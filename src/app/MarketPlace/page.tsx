'use client';

import Navbar from '@/components/Navbar';
import Listings from '@/components/Listings';
import Footer from '@/components/footer';
import Image from 'next/image';

export default function MarketPlace() {
  return (
    <>
      <Navbar />

      <div className="relative w-full h-[60vh]">
        <Image
          src="/TateCenter.jpg"
          alt="Background image of Tate Student Center"
          fill
          style={{ objectFit: 'cover' }}
          className="opacity-80 object-[center_40%] z-0"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <div className="absolute w-full h-15 top-31 bg-black opacity-40 z-5" />
          <h1
            className="text-4xl md:text-5xl font-bold text-red-500 z-10 relative"
            style={{ WebkitTextStroke: '1px black' }}
          >
            BULLDOG MARKETPLACE
          </h1>
          <div className="mt-4 w-full max-w-md z-10">
            <input
              type="text"
              placeholder="Search for items by type or title..."
              className="w-full p-3 rounded-lg border border-gray-300 text-black shadow-md bg-white"
            />
          </div>
        </div>
      </div>

      <div className="px-4 py-10 max-w-7xl mx-auto">
        <Listings />
      </div>

      <Footer />
    </>
  );
}