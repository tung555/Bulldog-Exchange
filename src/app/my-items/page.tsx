'use client';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Item {
  _id: string;
  title: string;
  condition: string;
  description?: string;
  imageUrl?: string;
}

export default function MyItemsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    condition: '',
    description: '',
    imageUrl: '',
  });

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const res = await fetch(`/api/items?uid=${currentUser.uid}`);
          const data = await res.json();
          setItems(data);
        } catch (error) {
          console.error('Failed to fetch items:', error);
        }
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };  

  const handlePostItem = async () => {
    if (!user) return;

    const res = await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, ownerUid: user.uid }),
    });

    if (res.ok) {
      setShowModal(false);
      setFormData({ title: '', condition: '', description: '', imageUrl: '' });
      router.refresh();
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-medium">
        You must be logged in to view this page.
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto py-10 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Items</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Add Item
          </button>
        </div>

        {items.length === 0 ? (
          <p className="text-gray-500">You haven't posted any items yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item) => (
              <div
                key={item._id}
                className="bg-white border border-gray-200 p-4 rounded shadow"
              >
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-sm italic text-gray-500">Condition: {item.condition}</p>
                {item.description && <p className="text-sm text-gray-600 mt-2">{item.description}</p>}
                {item.imageUrl && (
                    <div className="mt-3">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={400}
                      height={300}
                      className="rounded object-contain"
                    />
                  </div>                  
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 max-w-md w-full shadow-lg">
            <h2 className="text-xl font-bold mb-4">Post New Item</h2>

            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded mb-2"
            />
            <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded mb-2"
                required >
                <option value="">Select Condition</option>
                <option value="Brand New">Brand New</option>
                <option value="Like New">Like New</option>
                <option value="Very Good">Very Good</option>
                <option value="Good">Good</option>
                <option value="Acceptable">Acceptable</option>
            </select>

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded mb-2"
            />
            <input
              type="url"
              name="imageUrl"
              placeholder="Image URL"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handlePostItem}
                className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800"
              >
                Post Item
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
