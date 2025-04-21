'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.endsWith('@uga.edu')) {
      setError('Only @uga.edu emails are allowed for signup.');
      return;
    }

    try {
      const res = await fetch('/api/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong.');
        return;
      }

      alert('Account created! You can now log in.');
      router.push('/login');
    } catch (err) {
      setError('An unexpected error occurred.');
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="bg-red-500 p-8 rounded-xl shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">UGA Sign Up</h2>

          <form onSubmit={handleSignup} className="space-y-4">
            {error && <p className="text-white text-sm bg-black/40 px-4 py-2 rounded">{error}</p>}

            <div>
              <label className="block text-white font-medium mb-1">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="myID@uga.edu"
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
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm text-white hover:text-black"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md font-semibold hover:bg-white hover:text-black transition"
            >
              Sign Up
            </button>
          </form>

          <p className="text-white text-sm text-center mt-6">
            Already have an account?{' '}
            <a href="/login" className="underline hover:text-black">
              Login here
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
