'use client';

import Navbar from '@/components/Navbar';
import Listings from '@/components/Listings';
import Footer from '@/components/footer';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function MarketPlace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState(''); // Minimum price
  const [maxPrice, setMaxPrice] = useState(''); // Maximum price
  const [filteredData, setFilteredData] = useState([]);
  const [allListings, setAllListings] = useState([]);

  useEffect(() => {
    // Fetch all listings when the component mounts
    const fetchListings = async () => {
      try {
        const res = await fetch('/api/listings');
        const data = await res.json();
        setAllListings(data);
        setFilteredData(data); // Initialize filtered data with all listings
      } catch (err) {
        console.error('Error fetching listings:', err);
      }
    };

    fetchListings();
  }, []);

  const handleSearch = () => {
    const filtered = allListings.filter((item) => {
      const matchesQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesMinPrice = minPrice === '' || item.price >= parseFloat(minPrice);
      const matchesMaxPrice = maxPrice === '' || item.price <= parseFloat(maxPrice);
      return matchesQuery && matchesMinPrice && matchesMaxPrice;
    });
    setFilteredData(filtered);
  };

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
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search for items by type or title..."
              className="w-full p-3 rounded-lg border border-gray-300 text-black shadow-md bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Price Range Inputs */}
            <div className="flex gap-2 mt-4">
              <input
                type="number"
                placeholder="Min Price"
                className="w-1/2 p-3 rounded-lg border border-gray-300 text-black shadow-md bg-white"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <input
                type="number"
                placeholder="Max Price"
                className="w-1/2 p-3 rounded-lg border border-gray-300 text-black shadow-md bg-white"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>

            <button
              onClick={handleSearch}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 py-10 max-w-7xl mx-auto">
        <Listings items={filteredData} />
      </div>

      <Footer />
    </>
  );
}
