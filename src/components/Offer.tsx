'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSession} from 'next-auth/react';



interface OfferProps {
  offer: {
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

 const { data: session, status } = useSession();

  return (
    <div>
    <Link
      href={`/item/${item._id}`}
      className="bg-white border border-gray-200 rounded-lg p-4 shadow hover:shadow-md transition flex flex-row"
    >
      {item.imageUrl && (
        <div className="relative w-full h-48 mb-3">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="rounded object-cover"
          />
        </div>
      )}
      </Link>

      
      <div className="flex flex-col">
        <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
            <div>
                <h3 className="text-xl font-semibold mb-1">Offer of: {offer.price} by {offer.offerer_name}</h3>
                {session?.user.id === offer.owner_id && (<div>
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Accept
                </button>

                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Reject
                </button>
                </div>
            )}
                 {session?.user.id === offer.offerer_id && (<div>
                <h2>Status: {offer.status}</h2>
                </div>
            )}

            </div>
      </div>
    </div>
  );
};

export default Offer;
