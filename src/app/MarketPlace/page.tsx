'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Listing from '@/components/Listing'
import Listings from '@/components/Listings'

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  //i will implement later
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signing up with:', { name, email, password });
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white flex-col justify-between px-4">
        <div className="flex justify-center w-full max-w-md p-6 bg-white rounded-lg mt-10">
            <h1 className="text-3xl font-bold text-red-500 mb-6 text-center">
                BULLDOG MARKETPLACE
            </h1>
                       
        </div>
        <Listings/> 
      </div>
    </>
  );
}