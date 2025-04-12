'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Listing from '@/components/Listing';
import Listings from '@/components/Listings';
import Footer from '@/components/footer';

export default function MarketPlace() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white flex flex-col items-center px-4">
        <div className="flex flex-col w-full max-w-md p-6 bg-white rounded-lg">
          <h1 className="text-3xl font-bold text-red-500 mb-6 text-center">
            BULLDOG MARKETPLACE
          </h1>
          <div className="search-bar mb-4 flex justify-center">
            <input
              type="text"
              placeholder="Search for items by type or title..."
              className="w-full p-2 rounded-lg border border-gray-300 text-black"
            />
          </div>
        </div>
        <Listings />
      </div>
      <Footer />
    </>
  );
}
