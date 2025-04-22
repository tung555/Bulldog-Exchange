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
  

  useEffect(() => {
    const fetchOffers = async () => {
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

    fetchOffers();
  }, []);

  if (loading) return <div className="text-center py-10">Loading offers...</div>;

  if (!offers.length) {
    return <div className="text-center py-10">No offers found</div>;
  }

  return (
    <div className="mx-auto mt-2  flex flex-col">
      {offers.map(({offer, item}) => (
        <Offer key={offer.item_id} offer={offer} item={item}  />
      ))}
    </div>
  );
}
