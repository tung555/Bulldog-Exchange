import Image, {StaticImageData} from 'next/image'
import textbooks from '../../public/textbooks.jpg'
import { useEffect, useRef, useState } from 'react';
import Listing from '@/components/Listing';

type ListingData = {
  listing: {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
  };
};

const init: ListingData[] = [
  {
    listing: {
      id: 0,
      title: 'books',
      price: 70,
      description: 'Used textbooks',
      image: 'null',
    },
  },
  {
    listing: {
      id: 1,
      title: 'books',
      price: 70,
      description: 'Used textbooks',
      image: 'null',
    },
  },
  {
    listing: {
      id: 2,
      title: 'books',
      price: 70,
      description: 'Used textbooks',
      image: 'null',
    },
  },
  {
    listing: {
      id: 3,
      title: 'books',
      price: 70,
      description: 'Used textbooks',
      image: 'null',
    },
  },
  {
    listing: {
      id: 4,
      title: 'books',
      price: 70,
      description: 'Used textbooks',
      image: 'null',
    },
  },
  {
    listing: {
      id: 5,
      title: 'books',
      price: 70,
      description: 'Used textbooks',
      image: 'null',
    },
  },
];

const Listings = () => {
  const [listings, setListings] = useState(init);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;

    if (!grid) return;

    const handleScroll = (event: Event) => {
      const target = event.target as HTMLDivElement;

      // Check if the user has scrolled to the top or bottom of the grid
      if (target.scrollTop === 0) {
        // Prevent the grid from capturing the scroll and allow the page to scroll up
        window.scrollBy(0, -10);
      } else if (target.scrollTop + target.clientHeight >= target.scrollHeight) {
        // Prevent the grid from capturing the scroll and allow the page to scroll down
        window.scrollBy(0, 10);
      }
    };

    grid.addEventListener('scroll', handleScroll);

    return () => {
      grid.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-3 bg-white w-full h-200 overflow-auto"
    >
      {listings?.map((element, key) => {
        return <Listing listing={element.listing} key={key} />;
      })}
    </div>
  );
};

export default Listings;
