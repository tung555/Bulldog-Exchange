'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image'
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import Footer from '@/components/footer';
import MapWrapper from '@/components/MapWrapper';
import map from '../../../../public/map.png'
import textbook from '../../../../public/textbooks.jpg'




export default function ExpandedItem() {

    const [offerPlaced, setOfferPlaced] = useState(false)

    const submitOffer = () => {
        if (!offerPlaced) {
            alert("Offer Submitted");
            setOfferPlaced(true);
        } else {
            alert("Offer Removed");
            setOfferPlaced(false);
        }
    };

    const params = useSearchParams();
    let srcUrl = params.get("image");

    if (srcUrl == null) {
        srcUrl = "image not found";
    }
    return (
        <div className='flex flex-col h-screen grow'>
            <Navbar/>
            <div className="grid grid-cols-6 grow">
                <div className='col-start-1 col-end-4 bg-black flex justify-center items-center relative m-[70px] border-black outline-2 outline-offset-[15px]'>
                    <Image src={srcUrl} alt = "item image" fill={true} />
                </div>
                <div className='col-start-4 col-end-7 bg-red-500 flex flex-col m-6 '>
                    <div className='bg-white h-1/2'>
                        <p className='text-4xl m-5'>{params.get("title")}</p>
                        <p className='text-xl m-5'>{"$" + params.get("price")}</p>
                        <p className='text-md m-5'>{params.get("description")}</p>
                    </div>
                    <div className='bg-blue-600 h-3/6 m-[20px] relative'>
                        <MapWrapper clickEnabled={false}/>
                    </div>
                    <div className='h-1/6 bg-white flex justify-evenly items-center text-white'>
                        <button className='cursor-pointer bg-red-500 h-3/5 w-1/5 text-center flex justify-center items-center rounded-md' onClick={submitOffer}>
                            {offerPlaced ? (<p className='text-center sm:text-xs md:text-xs lg:text-sm xl:text-sm'>Remove Offer</p>) : (<p className='text-center sm:text-xs md:text-xs lg:text-sm xl:text-sm'>Submit Offer</p>)}
                        </button>
                        <Link className='bg-black h-3/5 w-1/3 text-center align-middle flex justify-center items-center rounded-md text-white' href={"/MarketPlace"}>
                            <p className='text-center sm:text-xs md:text-xs lg:text-sm xl:text-sm'>Return to Marketplace</p>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
    
}
