'use client'
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useState } from 'react';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password === confirmPassword) {
        const res = await fetch('/api/auth/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, password }),
        });

        const data = await res.json();
        setMessage(data.message);
    } else {
        setError("Passwords don't match");
    }
  };

  return (
    <>
    <Navbar />

    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Enter New Password</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && <p className="text-white text-sm bg-black/40 px-4 py-2 rounded">{error}</p>}
        <input
          type="password"
          placeholder="New Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <button type="submit" className="bg-black text-white py-2 rounded">
          Reset Password
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
    </>
  );
}
