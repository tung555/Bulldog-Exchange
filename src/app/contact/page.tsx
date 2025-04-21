'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/footer';
import Image from 'next/image';

export default function Contact() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white py-10 px-4">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h2 className="text-4xl font-bold text-red-500">Contact Us</h2>
            <Image
              src="/messageIcon.png"
              alt="Message Icon"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <p className="text-gray-700 text-lg">
            If you've experienced any issues or have questions, we'd love to hear from you!
          </p>
        </div>

        {/* Form */}
        <div className="max-w-xl mx-auto bg-white border border-gray-300 rounded-lg p-6 shadow-lg">
          <form
            action="https://formsubmit.co/ac7619f36b148b40c53f402e04785ba5"
            method="POST"
            className="space-y-4"
          >
            <div>
              <label className="block text-gray-700 font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Message</label>
              <textarea
                name="message"
                rows={5}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded-md font-semibold hover:bg-red-600 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}
