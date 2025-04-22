'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Footer from '@/components/footer';
import MapWrapper from '@/components/MapWrapper';
import { MapMouseEvent } from '@vis.gl/react-google-maps';
import Offers from '@/components/Offers';
import Offer from '@/components/Offer';

interface Item {
  _id: string;
  title: string;
  price: number;
  condition: string;
  description?: string;
  imageUrl?: string;
}

export default function OffersPage() {
  const { data: session, status } = useSession();
  const [items, setItems] = useState<Item[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    condition: '',
    description: '',
    imageUrl: '',
    position: {
      lat: 0,
      lng: 0,
    },
  });

  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.id) {
      fetch(`/api/items?uid=${session.user.id}`)
        .then((res) => res.json())
        .then((data) => setItems(data))
        .catch((error) => console.error('Failed to fetch items:', error));
    }
  }, [session, status]);


  
    

  if (status === 'loading') return <div className="p-10 text-center">Loading...</div>;

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-lg font-medium space-y-4 text-center">
        <p>You must be logged in to view this page.</p>
        <a
          href="/login"
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Go to Login
        </a>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto py-10 px-4 min-h-screen">
      <h1 className="text-5xl ml-3 ">Offers</h1>
      <h5 className="text-xl ml-3 mt-1 mb-4">View your created offers and offers on your items below!</h5>
      <Offers />

      </div>
      <Footer />
    </>
  );
}