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
    onDelete?: () => void;
  }

  

const Offer = ({offer, item, onDelete }: OfferProps) => {
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

    const deleteOffer = async () => {
      
      const res = await fetch(`/api/offer/${offer._id}`, {
        method: 'DELETE',
      });
  
      if (res.ok) {
        alert('Offer deleted successfully!');
        if(onDelete) onDelete();
      }
    };


 const { data: session, status } = useSession();
 const router = useRouter();
 
 if (!offer ||!item || !offer._id || !item._id) return null;

  return (
    <div className="border-3 border-black rounded-tl-4xl rounded-br-3xl rounded-bl-md rounded-tr-sm max-w-fit shadow-xl mb-5 bg-black">
    <div className="flex items-center border-2 border-red-600 rounded-tl-4xl rounded-br-3xl rounded-bl-md rounded-tr-sm max-w-fit shadow-xl h-55 bg-gray-50 pl-2">
    <Link
      href={`/item/${item._id}`}
      className="bg-white rounded-lg p-1 shadow hover:shadow-md transition"
    >
      {item.imageUrl ? (
  <div className="relative w-48 h-48 ml-1">
    <Image
      src={item.imageUrl}
      alt={item.title}
      fill
      className="rounded object-cover hover:shadow-2xl"
    />
  </div>
) : (
  <div className="ml-1 relative w-48 h-48 bg-gray-200 text-gray-500 flex items-center justify-center rounded">
    <span className="text-sm shadow-2xl">No image available</span>
  </div>
)}

      </Link>

      
      <div className="flex flex-col border-3 border-black ml-5 rounded-md max-w-fit p-2 mb-3 mr-2 bg-white">
        <h1 className="text-2xl font-bold pl-2 mt-1 pr-2">{item.title}</h1>
            <div className="p-2">
                <h3 className="text-xl font-medium mb-1">Offer of ${offer.price} by {offer.offerer_name}</h3>
                {session?.user.id === offer.owner_id && (
  <div className="flex flex-col gap-2 items-start">
    <div className="inline-flex">
    <p className={`text-md font-medium  ${
      offerStatus === 'accepted' ? 'text-green-600' : 'text-red-600'
    }`}>
      Current Status:&nbsp; 
    </p>
    <p className={`text-md font-bold  ${
      offerStatus === 'accepted' ? 'text-green-600' : 'text-red-600'
    }`}>
      {offerStatus}
    </p>
    </div>
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
    <div className="inline-flex">
    <p className={`text-md font-medium  ${
      offerStatus === 'accepted' ? 'text-green-600' : 'text-red-600'
    }`}>
      Current Status:&nbsp; 
    </p>
    <p className={`text-md font-bold  ${
      offerStatus === 'accepted' ? 'text-green-600' : 'text-red-600'
    }`}>
      {offerStatus}
    </p>
    </div>
    <button 
    onClick={() => deleteOffer()}
    className="bg-gray-100 border-1 border-black text-black text-sm mt-1 px-1 rounded hover:bg-gray-300">Delete Offer</button>
  </div>
)}
            </div>
      </div>
    </div>
    </div>
  );
};

export default Offer;
