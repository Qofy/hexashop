'use client';

import { useState } from 'react';
import { content } from '@/data/componentDatas/content_context';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';

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

const getEstimatedDelivery = (orderDate: string): string => {
  const date = new Date(orderDate);
  date.setDate(date.getDate() + 7);
  return date.toLocaleDateString();
};

const statusSteps: { status: OrderStatus; label: string; icon: React.ReactNode }[] = [
  { status: 'processing', label: 'Processing', icon: <Clock size={20} /> },
  { status: 'shipped', label: 'Shipped', icon: <Truck size={20} /> },
  { status: 'delivered', label: 'Delivered', icon: <CheckCircle size={20} /> },
];

export default function TrackOrder() {
  const trackContent = content.Tracking;
  const [searchId, setSearchId] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);

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
    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      setOrder(null);
    }
  };

  const getStatusIndex = (status: OrderStatus): number => {
    return statusSteps.findIndex(step => step.status === status);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
          {trackContent?.title}
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Enter your order ID to track your package in real-time
        </p>

        {/* Search Section */}
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
        </div>

        {/* Order Details Section */}
        {searched && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            {order ? (
              <>
                {/* Order Info */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Order ID</p>
                    <p className="text-lg font-bold text-gray-900">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{trackContent?.orderDate}</p>
                    <p className="text-lg font-bold text-gray-900">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{trackContent?.estimatedDelivery}</p>
                    <p className="text-lg font-bold text-green-600">{getEstimatedDelivery(order.date)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{trackContent?.trackingNumber}</p>
                    <p className="text-lg font-bold text-gray-900">{order.trackingNumber}</p>
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="mb-8">
                  <p className="text-sm font-semibold text-gray-900 mb-6">
                    {trackContent?.orderStatusLabel}
                  </p>
                  <div className="flex justify-between items-center">
                    {statusSteps.map((step, index) => {
                      const currentIndex = getStatusIndex(order.status);
                      const isCompleted = index <= currentIndex;
                      const isCurrentStep = index === currentIndex;

                      return (
                        <div key={step.status} className="flex flex-col items-center flex-1">
                          <div
                            className={`mb-4 p-3 rounded-full ${
                              isCompleted
                                ? 'bg-green-100 text-green-600'
                                : 'bg-gray-200 text-gray-400'
                            }`}
                          >
                            {step.icon}
                          </div>
                          <p
                            className={`text-sm font-medium text-center ${
                              isCompleted ? 'text-gray-900' : 'text-gray-500'
                            }`}
                          >
                            {step.label}
                          </p>
                          {isCurrentStep && (
                            <p className="text-xs text-blue-600 font-bold mt-2">CURRENT</p>
                          )}
                          {index < statusSteps.length - 1 && (
                            <div
                              className={`h-1 w-full mt-6 ${
                                isCompleted ? 'bg-green-600' : 'bg-gray-300'
                              }`}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Items Count */}
                <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                  <div className="flex items-center gap-3">
                    <Package size={20} className="text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Items in this order</p>
                      <p className="text-lg font-bold text-gray-900">{order.items} item(s)</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg mb-4">{trackContent?.noOrderMessage}</p>
                <button
                  onClick={() => {
                    setSearchId('');
                    setSearched(false);
                    setOrder(null);
                  }}
                  className="text-blue-600 hover:text-blue-700 font-semibold underline"
                >
                  Try another order ID
                </button>
              </div>
            )}
          </div>
        )}

        {/* Sample Orders Info */}
        {!searched && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
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
                    setOrder(mockOrders[orderId]);
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
    </div>
  );
}
