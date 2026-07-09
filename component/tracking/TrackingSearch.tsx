'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered';

type Order = {
  id: string;
  trackingNumber: string;
  date: string;
  total: number;
  items: number;
  status: OrderStatus;
};

const mockOrders: { [key: string]: Order } = {
  'HEX-2024-001234': {
    id: 'HEX-2024-001234',
    trackingNumber: 'TRACK123456789',
    status: 'shipped',
    date: '2024-12-15',
    total: 125.99,
    items: 3,
  },
  'HEX-2024-001235': {
    id: 'HEX-2024-001235',
    trackingNumber: 'TRACK123456790',
    status: 'delivered',
    date: '2024-12-10',
    total: 89.50,
    items: 2,
  },
  'HEX-2024-001236': {
    id: 'HEX-2024-001236',
    trackingNumber: 'TRACK123456791',
    status: 'processing',
    date: '2024-12-20',
    total: 199.99,
    items: 1,
  },
};

type Props = {
  trackContent: any;
  onOrderFound: (order: Order | null) => void;
};

export default function TrackingSearch({ trackContent, onOrderFound }: Props) {
  const searchParams = useSearchParams();
  const [searchId, setSearchId] = useState(() => searchParams.get('orderId') || '');
  const [searched, setSearched] = useState(() => !!searchParams.get('orderId'));

  const getAllOrders = (): { [key: string]: Order } => {
    const allOrders = { ...mockOrders };
    if (typeof window !== 'undefined') {
      const storedOrders = JSON.parse(localStorage.getItem('hexashop_orders') || '[]');
      storedOrders.forEach((order: Order) => {
        allOrders[order.id] = order;
      });
    }
    return allOrders;
  };

  const handleSearch = () => {
    setSearched(true);
    const allOrders = getAllOrders();
    const foundOrder = allOrders[searchId.toUpperCase()];
    onOrderFound(foundOrder || null);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            {trackContent?.searchLabel}
          </label>
          <input
            type="text"
            placeholder={trackContent?.searchPlaceholder}
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
          />
        </div>
        <div className="flex items-end">
          <button
            onClick={handleSearch}
            className="w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
          >
            {trackContent?.searchButton}
          </button>
        </div>
      </div>

      {searched && !searchId && (
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <p className="text-sm text-gray-700 mb-4">
            Try these sample order IDs to see tracking in action:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {Object.keys(mockOrders).map(orderId => (
              <button
                key={orderId}
                onClick={() => {
                  setSearchId(orderId);
                  setSearched(true);
                  const allOrders = getAllOrders();
                  onOrderFound(allOrders[orderId], orderId);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                {orderId}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
