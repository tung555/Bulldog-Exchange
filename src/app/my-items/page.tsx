'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Footer from '@/components/footer';
import MapWrapper from '@/components/MapWrapper';
import { MapMouseEvent } from '@vis.gl/react-google-maps';

interface Item {
  _id: string;
  title: string;
  price: number;
  condition: string;
  description?: string;
  imageUrl?: string;
  position?: {
    lat: number;
    lng: number;
  };
}

export default function MyItemsPage() {
  const { data: session, status } = useSession();
  const [items, setItems] = useState<Item[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    condition: '',
    description: '',
    imageUrl: '',
    position: {
      lat: 0,
      lng: 0,
    },
  });

  const router = useRouter();

  const fetchItems = async () => {
    if (session?.user?.id) {
      const res = await fetch(`/api/items?uid=${session.user.id}`);
      const data = await res.json();
      setItems(data);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      fetchItems();
    }
  }, [session, status]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMapChange = (e: MapMouseEvent) => {
    if (e.detail.latLng) {
      setFormData((prev) => ({
        ...prev,
        position: {
          lat: e.detail.latLng.lat,
          lng: e.detail.latLng.lng,
        },
      }));
    }
  };

  const handlePostItem = async () => {
    if (!session?.user?.id) return;

    const url = editingItemId ? `/api/items/${editingItemId}` : '/api/items';
    const method = editingItemId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        price: parseFloat(formData.price),
        ownerUid: session.user.id,
      }),
    });

    if (res.ok) {
      setShowModal(false);
      setEditingItemId(null);
      setFormData({
        title: '',
        price: '',
        condition: '',
        description: '',
        imageUrl: '',
        position: { lat: 0, lng: 0 },
      });
      fetchItems();
    }
  };

  const handleEdit = (item: Item) => {
    setEditingItemId(item._id);
    setFormData({
      title: item.title,
      price: item.price.toString(),
      condition: item.condition,
      description: item.description || '',
      imageUrl: item.imageUrl || '',
      position: item.position || { lat: 0, lng: 0 },
    });
    setShowModal(true);
  };

  const handleDelete = async (itemId: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this item?');
    if (!confirmed) return;

    const res = await fetch(`/api/items/${itemId}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      fetchItems();
    }
  };

  if (status === 'loading') return <div className="p-10 text-center">Loading...</div>;

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-lg font-medium space-y-4 text-center">
        <p>You must be logged in to view this page.</p>
        <a
          href="/login"
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Go to Login
        </a>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto py-10 px-4 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Items</h1>
          <button
            onClick={() => {
              setShowModal(true);
              setEditingItemId(null);
              setFormData({
                title: '',
                price: '',
                condition: '',
                description: '',
                imageUrl: '',
                position: { lat: 0, lng: 0 },
              });
            }}
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
                <p className="text-md text-red-600">${item.price}</p>
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
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 grid grid-cols-3 items-center justify-center z-50">
          {showMap && (
            <div className="w-2/3 h-1/3 col-start-1 col-end-2 justify-self-end mr-[10px]">
              <MapWrapper clickEnabled={true} MapChange={handleMapChange} />
            </div>
          )}
          <div className="bg-white col-start-2 col-end-3 rounded p-6 max-w-md w-full shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              {editingItemId ? 'Edit Item' : 'Post New Item'}
            </h2>

            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded mb-2"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded mb-2"
              min="0"
              required
            />
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded mb-2"
              required
            >
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

            <button
              className="w-1/2 px-3 py-2 rounded mb-4 bg-gray-300 hover:bg-gray-400"
              onClick={() => setShowMap(!showMap)}
            >
              Set Meetup Location
            </button>

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
                {editingItemId ? 'Update Item' : 'Post Item'}
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}