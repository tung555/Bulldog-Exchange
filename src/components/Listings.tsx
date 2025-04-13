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
      title: 'Books',
      price: 70,
      description: 'Textbooks lightly used, bought new one semester ago. Includes textbooks on calculus, chemistry, biology, and civil engineering. Not willing to negotiate price, lowballs will be ignored',
      image: 'https://www.bookstore.colostate.edu/SiteImages/109-SchoolImages/109-textbooks-600x400.jpg',
    },
  },
  {
    listing: {
      id: 1,
      title: 'Dresser',
      price: 20,
      description: 'Moving out, need someone to take this dresser. It\'s worth more than how much I have it listed for. The paint of the back is slightly chipped. Must provide your own way of transporting it',
      image: 'https://i.ebayimg.com/images/g/6HsAAOSw26tmOp~1/s-l1200.jpg',
    },
  },
  {
    listing: {
      id: 2,
      title: 'Lamp',
      price: 30,
      description: '2 years old, base is lightly worn. All sockets are in working order. Willing to give slight discount if payment in cash',
      image: 'https://d6qwfb5pdou4u.cloudfront.net/product-images/6840001-6850000/6841168/199fba5fd04ef5dfc9e89b3f03344c129c9fe22e3c24c21a90a4e07290e8a0d4/500-500-crop-0.jpg',
    },
  },
  {
    listing: {
      id: 3,
      title: 'Books',
      price: 70,
      description: 'Textbooks lightly used, bought new one semester ago. Includes textbooks on calculus, chemistry, biology, and civil engineering. Not willing to negotiate price, lowballs will be ignored',
      image: 'https://www.bookstore.colostate.edu/SiteImages/109-SchoolImages/109-textbooks-600x400.jpg',
    },
  },
  {
    listing: {
      id: 4,
      title: 'Dresser',
      price: 20,
      description: 'Moving out, need someone to take this dresser. It\'s worth more than how much I have it listed for. The paint of the back is slightly chipped. Must provide your own way of transporting it',
      image: 'https://i.ebayimg.com/images/g/6HsAAOSw26tmOp~1/s-l1200.jpg',
    },
  },
  {
    listing: {
      id: 5,
      title: 'Lamp',
      price: 30,
      description: '2 years old, base is lightly worn. All sockets are in working order. Willing to give slight discount if payment in cash',
      image: 'https://d6qwfb5pdou4u.cloudfront.net/product-images/6840001-6850000/6841168/199fba5fd04ef5dfc9e89b3f03344c129c9fe22e3c24c21a90a4e07290e8a0d4/500-500-crop-0.jpg',
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
