import Link from 'next/link'
import Navbar from '@/components/Navbar';
import Footer from '@/components/footer';
import Image from 'next/image';
import logo from '../../public/logo.png';

export default function NotFound() {

    return (
        <div className='flex flex-col h-screen grow'>
            <Navbar/>
            <div className='flex flex-row grow justify-center gap-[25px]'>
                <div className='p-auto flex items-center justify-end grow'>
                    <Image src={logo} width={250} alt="temp image" className='h-auto'/>
                </div>
                <div className='flex flex-col justify-center grow gap-[25px]'>
                    <h1 className='font-bold text-6xl'>Sorry,</h1>
                    <h2 className='font-bold text-5xl'>Page Not Found</h2>
                </div>
            </div>
            <Footer/>
        </div>
        
    );

}

