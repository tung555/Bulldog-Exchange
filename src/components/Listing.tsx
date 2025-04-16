// components/Listing.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';

interface ListingProps {
  item: {
    _id: string;
    title: string;
    price: number;
    condition: string;
    description?: string;
    imageUrl?: string;
  };
}

const Listing = ({ item }: ListingProps) => {
  const shortenDescription = (desc: string | undefined) => {
    if (!desc) return '';
    return desc.length > 100 ? desc.slice(0, 97) + '...' : desc;
  };

  return (
    <Link
      href={`/item/${item._id}`}
      className="bg-white border border-gray-200 rounded-lg p-4 shadow hover:shadow-md transition flex flex-col"
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
      <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
      <p className="text-md text-red-600 font-bold">${item.price.toFixed(2)}</p>
      <p className="text-sm italic text-gray-500">Condition: {item.condition}</p>
      <p className="text-sm text-gray-600 mt-1">{shortenDescription(item.description)}</p>
    </Link>
  );
};

export default Listing;