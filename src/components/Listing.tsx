import Image, { StaticImageData } from 'next/image'
import textbooks from '../../public/textbooks.jpg'
import { useState,useEffect } from 'react';
import { auth } from '@/lib/firebase';
import Link from 'next/link';

interface ListingData {
    listing : {
        id: number;
        title: string;
        price: number;
        description: string;  
        image: string  
    }
}

const Listing = ({listing}:ListingData) => {

    const [isLoggedIn,setIsLoggedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setIsLoggedIn(!!user);
        });

        return () => unsubscribe();
    });
    const shortenDescription = () => {
        if (listing.description.length > 108) {
            let shortened:string = listing.description.substring(0,108);
            let lastFullWord:number = shortened.lastIndexOf(" ");
            if (lastFullWord == -1) {
                lastFullWord = 108
            }
            shortened = shortened.substring(0,lastFullWord);
            return shortened += " ..."
        } else {
            return listing.description;
        }
    }

    let pathname = isLoggedIn ? `/item/${listing.id}` : '/'

    return (
        <Link href={{
            pathname: pathname,
            query:{
                title: listing.title,
                price: listing.price,
                description: listing.description,
                image: listing.image
            }
        }} 
        className="flex-col bg-red-500 h-90 min-w-2xs max-w-2xs rounded-md m-20 border-2">
            <div className = "h-3/5 w-full rounded-sm relative">
                <Image className = "rounded-sm" src={listing.image} fill={true} alt = "Used textbooks"/>        
            </div>
            
            <div className='w-full h-2/5 p-[6px]'>
                <div className='bg-white w-full h-full rounded-md text-left p-[5px]'>
                    <p className='text-lg'>{listing.title}</p>
                    <p className='text-md mb-[5px]'>${listing.price}</p>
                    <p className='text-sm'>{shortenDescription()}</p>
                </div>
            </div>
        </Link>
    )
}

export default Listing