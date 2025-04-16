'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image'
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import Footer from '@/components/footer';
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
    console.log(srcUrl);
    if (srcUrl == null) {
        srcUrl = "image not found";
    }
    return (
        <div className='flex flex-col h-screen grow'>
            <Navbar/>
            <div className="grid grid-cols-6 grow">
                <div className='col-start-1 col-end-5 bg-black flex justify-center items-center relative m-[70px]'>
                    <Image src={srcUrl} alt = "item image" fill={true} />
                </div>
                <div className='col-start-5 col-end-7 bg-red-500 flex flex-col m-6 border-black outline-2 rounded-md outline-offset-[10px]'>
                    <div className='bg-white h-1/2'>
                        <p className='text-3xl m-5'>{params.get("title")}</p>
                        <p className='text-xl m-5'>{"$" + params.get("price")}</p>
                        <p className='text-md m-5'>{params.get("description")}</p>
                    </div>
                    <div className='bg-blue-600 h-3/6 m-[20px] relative'>
                        <Image src={map} alt = "item location" fill={true} />
                    </div>
                    <div className='h-1/6 bg-white flex justify-evenly items-center text-white'>
                        <button className='cursor-pointer bg-red-500 h-2/5 w-1/5 text-center flex justify-center items-center rounded-md' onClick={submitOffer}>
                            {offerPlaced ? (<p className='text-center'>Remove Offer</p>) : (<p className='text-center'>Submit Offer</p>)}
                        </button>
                        <Link className='bg-black h-2/5 w-2/6 text-center align-middle flex justify-center items-center rounded-md text-white' href={"/MarketPlace"}>
                        <p className='text-center'>Return to Marketplace</p>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
    
}
