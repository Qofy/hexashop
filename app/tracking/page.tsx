'use client';

import { Metadata } from "next";
import { Suspense, useState } from 'react';
import { content } from '@/data/componentDatas/content_context';
import TrackingHeader from '@/component/tracking/TrackingHeader';
import TrackingSearch from '@/component/tracking/TrackingSearch';
import TrackingOrderDetails from '@/component/tracking/TrackingOrderDetails';
import TrackingStatusTimeline from '@/component/tracking/TrackingStatusTimeline';
import TrackingItemsInfo from '@/component/tracking/TrackingItemsInfo';
import TrackingNoOrder from '@/component/tracking/TrackingNoOrder';

export const metadata: Metadata = {
  title: "Track Your Order - HexaShop",
  description: "Track your HexaShop order in real-time. Enter your order ID to see shipping status and delivery information.",
};
import TrackingSampleOrders from '@/component/tracking/TrackingSampleOrders';

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

export default function TrackOrder() {
  const trackContent = content.Tracking;
  const [order, setOrder] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);

  const handleOrderFound = (foundOrder: Order | null) => {
    setOrder(foundOrder);
    setSearched(true);
  };

  const handleTryAgain = () => {
    setOrder(null);
    setSearched(false);
  };

  const handleSelectSampleOrder = (orderId: string) => {
    setOrder(mockOrders[orderId]);
    setSearched(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <TrackingHeader trackContent={trackContent} />

        <Suspense fallback={<div className="text-center py-8">Loading search...</div>}>
          <TrackingSearch trackContent={trackContent} onOrderFound={handleOrderFound} />
        </Suspense>

        {searched && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            {order ? (
              <>
                <TrackingOrderDetails
                  orderId={order.id}
                  date={new Date(order.date).toLocaleDateString()}
                  trackingNumber={order.trackingNumber}
                  estimatedDelivery={getEstimatedDelivery(order.date)}
                  trackContent={trackContent}
                />
                <TrackingStatusTimeline status={order.status} trackContent={trackContent} />
                <TrackingItemsInfo itemCount={order.items} />
              </>
            ) : (
              <TrackingNoOrder trackContent={trackContent} onTryAgain={handleTryAgain} />
            )}
          </div>
        )}

        {!searched && (
          <TrackingSampleOrders
            mockOrders={mockOrders}
            onSelectOrder={handleSelectSampleOrder}
          />
        )}
      </div>
    </div>
  );
}
