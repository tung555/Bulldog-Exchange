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
}

export default function MyItemsPage() {
  const { data: session, status } = useSession();
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]); // State for filtered items
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [showModal, setShowModal] = useState(false);
  const [showMap, setShowMap] = useState(false);
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

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.id) {
      fetch(`/api/items?uid=${session.user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setItems(data);
          setFilteredItems(data); // Initialize filtered items with all items
        })
        .catch((error) => console.error('Failed to fetch items:', error));
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

    const res = await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        price: parseFloat(formData.price),
        ownerUid: session.user.id
      }),
    });

    if (res.ok) {
      setShowModal(false);
      setFormData({
        title: '',
        price: '',
        condition: '',
        description: '',
        imageUrl: '',
        position: { lat: 0, lng: 0 },
      });
      router.refresh();
    }
  };

  const handleSearch = () => {
    const filtered = items.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered);
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
            onClick={() => setShowModal(true)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Add Item
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search your items by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 text-black shadow-md bg-white"
          />
          <button
            onClick={handleSearch}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Search
          </button>
        </div>

        {filteredItems.length === 0 ? (
          <p className="text-gray-500">No items found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredItems.map((item) => (
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
            <h2 className="text-xl font-bold mb-4">Post New Item</h2>

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
                Post Item
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
