'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useSession} from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';


interface OfferProps {
  offer: {
    _id: string;
    offerer_id: string;
    offerer_name: string;
    owner_id: string;
    item_id: string;
    title: string;
    price?: number;
    status: string;
  };
    item: {
      _id: string;
      title: string;
      price?: number;
      condition: string;
      description?: string;
      imageUrl?: string;
    };
  }

  

const Offer = ({offer, item }: OfferProps) => {
  const [offerStatus, setOfferStatus] = useState(offer.status);

  const submitOffer = async (newStatus: string) => {
    
    const res = await fetch(`/api/offer/${offer._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
       status: newStatus,
      }),
    });

    if (res.ok) {
      setOfferStatus(newStatus);
      router.refresh();
    }
  };


 const { data: session, status } = useSession();
 const router = useRouter();
  return (
    <div className="flex items-center border border-black-200 rounded-lg max-w-fit p-2">
    <Link
      href={`/item/${item._id}`}
      className="bg-white rounded-lg p-1 shadow hover:shadow-md transition"
    >
      {item.imageUrl ? (
  <div className="relative w-48 h-48">
    <Image
      src={item.imageUrl}
      alt={item.title}
      fill
      className="rounded object-cover"
    />
  </div>
) : (
  <div className="relative w-48 h-48 bg-gray-200 text-gray-500 flex items-center justify-center rounded">
    <span className="text-sm">No image available</span>
  </div>
)}

      </Link>

      
      <div className="flex flex-col border border-black-100 ml-5 rounded-lg mr-3">
        <h1 className="text-2xl font-bold pl-2 mt-1">{item.title}</h1>
            <div className="p-2">
                <h3 className="text-xl font-medium mb-1">Offer of ${offer.price} by {offer.offerer_name}</h3>
                {session?.user.id === offer.owner_id && (
  <div className="flex flex-col gap-2 items-start">
    <p className={`text-md font-medium ${
      offerStatus === 'accepted' ? 'text-green-600' : 'text-red-600'
    }`}>
      Current Status: {offerStatus}
    </p>

    <div className="flex gap-2">
      <button
        onClick={() => submitOffer('accepted')}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Accept
      </button>

      <button
        onClick={() => submitOffer('rejected')}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Reject
      </button>
    </div>
  </div>
)}

{session?.user.id === offer.offerer_id && session?.user.id !== offer.owner_id && (
  <div className="flex flex-col gap-2 items-start">
    <p className={`text-md font-medium ${
      offerStatus === 'accepted' ? 'text-green-600' : 'text-red-600'
    }`}>
      Current Status: {offerStatus}
    </p>

  </div>
)}
            </div>
      </div>
    </div>
  );
};

export default Offer;
