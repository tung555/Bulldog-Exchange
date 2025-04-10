import Image, { StaticImageData } from 'next/image'
import textbooks from '../../public/textbooks.jpg'
import { useState } from 'react';

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


    return (
        <div className="flex-col bg-red-500 h-90 min-w-2xs max-w-2xs rounded-md m-20 border-2">
            <Image className = "h-3/5 w-full rounded-sm" src={textbooks} alt = "Used textbooks"/>
            <div className='w-full h-2/5 p-[6px]'>
                <div className='bg-white w-full h-full rounded-md text-left p-[5px]'>
                    <p className='text-lg'>{listing.title}</p>
                    <p className='text-md mb-[5px]'>${listing.price}</p>
                    <p className='text-sm'>{listing.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Listing