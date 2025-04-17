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
  
<div className="flex items-center justify-center gap-2">
<h2 className="text-2xl font-coiny">
    Contact Us
</h2>
<img 
  src="/messageIcon.png"
  alt="Icon of Message Symbol"
  className="h-7 w-10"
  />
</div>
<p className=" text-2x1">
If you've experienced any problems or have any questions, contact us here! 
</p>
</div>

<div className=" flex justify-center center">
  <form action="https://formsubmit.co/ac7619f36b148b40c53f402e04785ba5" method="POST" className="flex flex-col mt-2 mb-5 border-2 border-black pb-5 pl-3 pr-3 rounded-md shadow-lg">
    <label className="mt-1">Name: </label>
    <input type="text" className="border-black border-2 rounded-b-sm mt-1 mb-1" required/>
    <label>Email: </label>
    <input type="email" name="email" className="border-black border-2 rounded-b-sm mt-1 mb-1" required/>
    <label >Message: </label>
    <textarea name="message" className="border-black border-2 rounded-b-sm mt-1 mb-1"></textarea>

    <button type="submit" className="border-black border-2 rounded-b-sm m-2 shadow-lg">Submit</button>

  </form>
</div>

 

<Footer />
    </>
  );
}
