// components/Offers.tsx
'use client';

import { useEffect, useState } from 'react';
import Offer from './Offer';


interface Offer {
    offer: {
    _id: string;
    offerer_id: string;
    offerer_name: string;
    owner_id: string;
    item_id: string;
    title: string;
    price?: number;
    status: string;
    }

    item:  {
      _id: string;
      title: string;
      price: number;
      condition: string;
      description?: string;
      imageUrl?: string;
    }

  };

export default function Offers() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  


    const fetchOffers = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/offer');
        const data = await res.json();
        setOffers(data);
        console.log(offers.length);
      } catch (err) {
        console.error('Failed to load offers:', err);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchOffers();
  }, []);

  if (loading) return <div className="text-center py-10">Loading offers...</div>;

  if (!offers.length) {
    return <div className="text-center py-10">No offers found</div>;
  }

  return (
    <div className="mx-auto mt-2  flex flex-col">
      {offers.map(({offer, item}) => (
         <Offer
         key={offer._id}
         offer={offer}
         item={item}
         onDelete={() =>
           setOffers((prev) =>
             prev.filter((o) => o.offer._id !== offer._id)
           )
         }
       />
      ))}
    </div>
  );
}
