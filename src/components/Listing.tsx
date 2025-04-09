import Image from 'next/image'
import textbooks from '../../public/textbooks.jpg'
import { useState } from 'react';

const Listing = () => {

    const [listingData, setListingData] = useState(
        {
            title: "Title",
            price: "Price",
            description: "Description"
        }
    );

    return (
        <div className=" flex-col bg-red-500 h-90 min-w-2xs max-w-2xs rounded-md m-20 border-2">
            <Image className = "h-3/5 w-full rounded-sm" src={textbooks} alt = "Used textbooks"/>
            <div className='w-full h-2/5 p-[6px]'>
                <div className='bg-white w-full h-full rounded-md text-left p-[5px]'>
                    <p className='text-lg'>{listingData.title}</p>
                    <p className='text-md mb-[5px]'>{listingData.price}</p>
                    <p className='text-sm'>{listingData.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Listing