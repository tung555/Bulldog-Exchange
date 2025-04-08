'use client';
import connectMongoDB from '@/lib/mongodb';
import Navbar from '../components/Navbar';
import Image from 'next/image';

export default function Home() {
  connectMongoDB();
  return (
    <>
      <Navbar />

      <div className="relative h-screen w-screen" >
        <Image
          src="/./UGASplash2.jpg"
          alt="Background"
          fill
          className="object-cover opacity-80 bg-white"
          priority
        />
        {/* Container for title */}
        <div className="absolute inset-0 flex justify-center text-white top-10">
          <h1 className="text-4xl md:text-6xl font-bold">
            Welcome to Bulldog Exchange
          </h1>
        </div> 
      </div>
    </>
  );
}
