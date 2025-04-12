'use client';
import connectMongoDB from '@/lib/mongodb';
import Navbar from '../components/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '../components/footer';


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
        <div className="absolute inset-0 flex justify-center text-white top-8">
          <h1 className="text-4xl md:text-6xl font-bold text-center px-3 py-2 rounded-sm coiny-regular "
          style={{ backgroundColor: 'rgba(241, 45, 45, 1)', border:'5px solid #D13030', height: 'fit-content', WebkitTextStroke: '2px black'}}>
            Welcome to Bulldog Exchange
          </h1>
        </div> 
        <div className="absolute inset-0 flex justify-center text-white top-30" >
          <h2 className="text-2xl md:text-4xl font-bold text-center py-2 rounded-sm px-3 shadow-md"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', border:'3px solid #fcfafa', height: 'fit-content', WebkitTextStroke: '1px black', fontSize:'30px'}}>
            Sign in to join other UGA Dawgs and sell your used books and items today!
          </h2>
        </div>
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2">
          <Link href="/MarketPlace">
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow-lg border-1 border-white" style={{WebkitTextStroke: '1px black'}}>
              Browse Now
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
