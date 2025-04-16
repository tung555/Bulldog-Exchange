'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import Footer from '@/components/footer';
import MapWrapper from '@/components/MapWrapper';
import { useSession } from 'next-auth/react';

interface Item {
  title: string;
  price: number;
  condition: string;
  description?: string;
  imageUrl?: string;
  position?: {
    lat: number;
    lng: number;
  };
}

export default function ExpandedItem() {
  const [item, setItem] = useState<Item | null>(null);
  const [offerPlaced, setOfferPlaced] = useState(false);
  const params = useParams();
  const itemId = params?.id as string;

  const { data: session, status } = useSession();

  useEffect(() => {
    if (itemId && status === 'authenticated') {
      fetch(`/api/items/${itemId}`)
        .then((res) => res.json())
        .then((data) => setItem(data))
        .catch((err) => console.error('Failed to fetch item:', err));
    }
  }, [itemId, status]);

  const submitOffer = () => {
    alert(offerPlaced ? 'Offer Removed' : 'Offer Submitted');
    setOfferPlaced((prev) => !prev);
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Checking authentication...
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center space-y-4 text-lg font-medium">
        <p>You must be logged in to view this item.</p>
        <Link
          href="/login"
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading item details...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen grow">
      <Navbar />
      <div className="grid grid-cols-6 grow">
        <div className="col-start-1 col-end-4 bg-black flex justify-center items-center relative m-[70px] border-black outline-2 outline-offset-[15px]">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt="item image"
              fill
              className="object-contain rounded"
            />
          ) : (
            <div className="text-white">No image available</div>
          )}
        </div>

        <div className="col-start-4 col-end-7 bg-red-500 flex flex-col m-6">
          <div className="bg-white h-1/2 p-5">
            <p className="text-4xl mb-3">{item.title}</p>
            <p className="text-xl mb-3 text-red-600 font-bold">${item.price}</p>
            <p className="text-md mb-3">Condition: {item.condition}</p>
            <p className="text-md">{item.description}</p>
          </div>

          <div className="bg-blue-600 h-3/6 m-[20px] relative">
            <MapWrapper
              clickEnabled={false}
              initialPosition={item.position || { lat: 33.950001, lng: -83.383331 }}
            />
          </div>

          <div className="h-1/6 bg-white flex justify-evenly items-center text-white">
            <button
              className="cursor-pointer bg-red-500 h-3/5 w-1/5 text-center flex justify-center items-center rounded-md"
              onClick={submitOffer}
            >
              <p className="text-center text-sm">
                {offerPlaced ? 'Remove Offer' : 'Submit Offer'}
              </p>
            </button>
            <Link
              className="bg-black h-3/5 w-1/3 text-center flex justify-center items-center rounded-md text-white"
              href="/MarketPlace"
            >
              <p className="text-center text-sm">Return to Marketplace</p>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
