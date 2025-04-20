// components/Listings.tsx
'use client';

import Listing from './Listing';

interface Item {
  _id: string;
  title: string;
  price: number;
  condition: string;
  description?: string;
  imageUrl?: string;
}

interface ListingsProps {
  items: Item[];
}

export default function Listings({ items }: ListingsProps) {
  if (!items.length) {
    return <div className="text-center py-10">No items found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <Listing key={item._id} item={item} />
      ))}
    </div>
  );
}
