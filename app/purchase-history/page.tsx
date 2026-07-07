'use client';

import { useState, useEffect, startTransition } from 'react';
import PurchaseHistoryHeader from '@/component/purchase-history/PurchaseHistoryHeader';
import PurchaseHistorySortControls from '@/component/purchase-history/PurchaseHistorySortControls';
import PurchaseHistoryTable from '@/component/purchase-history/PurchaseHistoryTable';
import PurchaseHistoryCards from '@/component/purchase-history/PurchaseHistoryCards';
import PurchaseHistoryEmpty from '@/component/purchase-history/PurchaseHistoryEmpty';

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered';

type Order = {
  id: string;
  trackingNumber: string;
  date: string;
  total: number;
  items: number;
  status: OrderStatus;
};

export default function PurchaseHistory() {
  const [state, setState] = useState<{ orders: Order[]; loading: boolean; sortBy: 'date' | 'total' }>({
    orders: [],
    loading: true,
    sortBy: 'date',
  });

  const { orders, loading, sortBy } = state;

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('hexashop_orders') || '[]');
    const sorted = storedOrders.sort((a: Order, b: Order) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    startTransition(() => {
      setState({ orders: sorted, loading: false, sortBy: 'date' });
    });
  }, []);

  const handleSort = (sortType: 'date' | 'total') => {
    const sorted = [...orders].sort((a, b) => {
      if (sortType === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return b.total - a.total;
      }
    });
    setState({ orders: sorted, loading: false, sortBy: sortType });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your purchase history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <PurchaseHistoryHeader />

        {orders.length === 0 ? (
          <PurchaseHistoryEmpty />
        ) : (
          <>
            <PurchaseHistorySortControls
              sortBy={sortBy}
              onSort={handleSort}
              orderCount={orders.length}
            />
            <PurchaseHistoryTable orders={orders} />
            <PurchaseHistoryCards orders={orders} />
          </>
        )}
      </div>
    </div>
  );
}
