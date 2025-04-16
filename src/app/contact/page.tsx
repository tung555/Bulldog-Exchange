'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Listing from '@/components/Listing';
import Listings from '@/components/Listings';
import Footer from '@/components/footer';
import Image from 'next/image';

export default function Contact() {
  return (
    <>
  <Navbar />

<div className="w-full min-h-full pt-10 display:flex justify-center text-center">

<h2 className="text-2xl font-coiny">
    Contact Us
</h2>
<p className="p-2 text-2x1">
If you've experienced any problems or have any questions, contact us here! 
</p>

<div className="border-1 border-black p-2">
    <input type="text" className="border-black border-2 rounded-b-sm"/>

</div>

 
</div>
<Footer />
    </>
  );
}
