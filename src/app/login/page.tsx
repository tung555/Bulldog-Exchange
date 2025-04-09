'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  //i will implement later
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Logging in with:', { email, password });
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="bg-red-500 p-8 rounded-xl shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">UGA Login</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-white font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='myID@uga.edu'
                required
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full px-4 py-2 border border-gray-200 rounded-md pr-16 focus:outline-none focus:ring-2 focus:ring-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 text-sm text-white hover:text-black"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md font-semibold hover:bg-white hover:text-black transition"
            >
              Login
            </button>
          </form>

          <p className="text-white text-sm text-center mt-6">
            Don’t have an account?{' '}
            <a href="/signup" className="underline hover:text-black">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
