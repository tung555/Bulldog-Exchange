'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import Footer from '@/components/footer';
import MapWrapper from '@/components/MapWrapper';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Item {
  _id?: string;
  ownerUid: string, 
  title?: string;
  price: number;
  condition: string;
  description?: string;
  imageUrl?: string;
  position?: {
    lat: number;
    lng: number;
  };
}


export default function ExpandedItem() {
  const [item, setItem] = useState<Item | null>(null);
  const [addrInfo, setAddrInfo] = useState({address_line1:"",state_code:"",city:"",postcode:""});
  const [offerPlaced, setOfferPlaced] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [offerPrice, setOfferPrice] = useState('');
  const params = useParams();
  const itemId = params?.id as string;
  const router = useRouter();

  const { data: session, status } = useSession();
  
  useEffect(() => {
    if (itemId && status === 'authenticated') {
      fetch(`/api/items/${itemId}`)
        .then((res) => res.json())
        .then((data) => {
          setItem(data)
          if ("position" in data) {
            fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${data.position.lat}&lon=${data.position.lng}&apiKey=${process.env.NEXT_PUBLIC_REVERSE_GEO_API_KEY}`)
           .then((newRes) => {
              return newRes.json();  
            })
            .then((newData)=>{
              console.log(newData);
              setAddrInfo(
                {
                  address_line1: newData.features[0].properties.address_line1,
                  state_code: newData.features[0].properties.state_code,
                  city: newData.features[0].properties.city,
                  postcode: newData.features[0].properties.postcode,

                })
              })
           .catch((err) => console.log("Error fetching address data"));
            
          }
        })
        .catch((err) => console.error('Failed to fetch item:', err));
    }
  }, [itemId, status]);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setOfferPrice(e.target.value);
  };

  const submitOffer = async () => {
    if (!session?.user?.id) return;
    console.log("Button Pressed");
  const checkRes = await fetch(`/api/offer/user/${session.user.id}?item_id=${itemId}`);
  const existingOffer = await checkRes.json();

  const method = existingOffer?._id ? 'PUT' : 'POST';
  const url = existingOffer?._id ? `/api/offer/${existingOffer._id}` : `/api/offer`;

  const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        offerer_id: session.user.id,
        offerer_name: session.user.name,
        owner_id: item.ownerUid,
        item_id: itemId,
        title: item.title,
        price: offerPrice,
        status: 'pending',
      }),
    });




    if (res.ok) {
      alert('Offer submitted successfully!');
      router.push('/MarketPlace');
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Checking authentication...
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center space-y-4 text-lg font-medium">
        <p>You must be logged in to view this item.</p>
        <Link
          href="/login"
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading item details...
      </div>
    );
  }

  const setConditionColor = () => {
    let baseClass = "size-fit p-2 mb-3 rounded-md";
    if (item.condition === "Brand New") {
      baseClass += " bg-[#2bba00]";
    } else if (item.condition === "Like New") {
      baseClass += " bg-[#bbdb44]"
    } else if (item.condition === "Very Good") {
      baseClass += " bg-[#f7e379]"
    } else if (item.condition === "Good") {
      baseClass += " bg-[#f2a134]"
    } else if (item.condition === "Acceptable") {
      baseClass += " bg-[#e51f1f]"
    } else {
      baseClass += " bg-[#c8c8c8]"
    }

    return baseClass;
  }

  return (
    
    <div className="flex flex-col h-screen grow">
      <Navbar />
      <div className="grid grid-cols-6 grow">
        <div className="col-start-1 col-end-4 bg-black flex justify-center items-center relative m-[70px] border-black outline-2 outline-offset-[15px]">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt="item image"
              fill
              className="object-contain rounded"
            />
          ) : (
            <div className="text-white">No image available</div>
          )}
        </div>

        <div className="col-start-4 col-end-7 bg-red-500 flex flex-col m-6">
          <div className="bg-white h-1/2 p-5">
            <div className='flex flex-row justify-between'>
              <p className="text-4xl mb-3">{item.title}</p>
              <button className= 'p-3 bg-red-500 rounded-md text-white cursor-pointer mr-3' onClick={()=>{setShowAddress(!showAddress)}}>
                Show Address
                {showAddress && (<div className='text-wrap text-left min-w-[150px] cursor-default text-black absolute p-3 bg-gray-200 rounded-md text-sm mt-[30px] right-[50px]'>
                  {addrInfo.address_line1}<br/>City: {addrInfo.city}, {addrInfo.postcode}<br/>State: {addrInfo.state_code}
                </div>)}
              </button>
            </div>
            <p className="text-xl mb-3 text-red-600 font-bold">${item.price}</p>
            <div className={setConditionColor()}>
              <p className="text-md">{item.condition}</p>
            </div>
            <p className="text-md">{item.description}</p>
          </div>

          <div className="bg-blue-600 h-3/6 m-[10px] relative">
            <MapWrapper
              clickEnabled={false}
              initialPosition={item.position || { lat: 33.950001, lng: -83.383331 }}
            />
          </div>

          <div className="h-1/6 bg-white flex justify-evenly items-center text-white">
            <input name="offerInput" className="p-1 text-black border-black-2 bg-gray-50" onChange={handleChange} required placeholder="Offer here" min="0 value=''">
            </input>
            <button
              className="cursor-pointer bg-red-500 h-3/5 w-1/5 text-center flex justify-center items-center rounded-md"
              onClick={submitOffer}
            >
              <p className="text-center text-sm">
                {offerPlaced ? 'Remove Offer' : 'Submit Offer'}
              </p>
            </button>
            <Link
              className="bg-black h-3/5 w-1/3 text-center flex justify-center items-center rounded-md text-white"
              href="/MarketPlace"
            >
              <p className="text-center text-sm">Return to Marketplace</p>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
