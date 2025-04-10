import Image, {StaticImageData} from 'next/image'
import textbooks from '../../public/textbooks.jpg'
import Listing from '@/components/Listing'
import { useState } from 'react';

type ListingData = {
    listing : {
        id: number;
        title: string;
        price: number;
        description: string;   
        image: string; 
    }
};

const init: ListingData[] = [
    {
        listing: {
            id: 0,
            title:"books",
            price:70,
            description: "Used textbooks",
            image: "null"
        }
    },
    {
        listing: {
            id: 1,
            title:"books",
            price:70,
            description: "Used textbooks",
            image: "null"
        }
    },
    {
        listing: {
            id: 2,
            title:"books",
            price:70,
            description: "Used textbooks",
            image: "null"
        }
    },
    {
        listing: {
            id: 3,
            title:"books",
            price:70,
            description: "Used textbooks",
            image: "null"
        }
    },
    {
        listing: {
            id: 4,
            title:"books",
            price:70,
            description: "Used textbooks",
            image: "null"
        }
    },
    {
        listing: {
            id: 5,
            title:"books",
            price:70,
            description: "Used textbooks",
            image: "null"
        }
    }
];

const Listings = () => {

 
    const [listings,setListings] = useState(init);

    return (
        <div className='grid grid-cols-3 bg-black-500 w-full h-200'>
            {listings?.map((element,key) => {
                return <Listing listing={element.listing} key={key}/>
            })};
        </div>
    )
    

}

export default Listings