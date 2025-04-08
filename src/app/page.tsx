'use client';
import connectMongoDB from '@/lib/mongodb';
import Navbar from '../components/Navbar';
import Image from 'next/image';

export default function Home() {
  connectMongoDB();
  return (
    <>
      <Navbar />

      <div className="relative h-screen w-screen">
        <Image
          src="/UGAArch.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-40">
          <h1 className="text-4xl md:text-6xl font-bold">
            Welcome to Bulldog Exchange
          </h1>
        </div>
      </div>
    </>
  );
}
