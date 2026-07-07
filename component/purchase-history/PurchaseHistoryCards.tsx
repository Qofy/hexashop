import Link from 'next/link';
import { Clock, Package, Truck, CheckCircle } from 'lucide-react';

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered';

type Order = {
  id: string;
  trackingNumber: string;
  date: string;
  total: number;
  items: number;
  status: OrderStatus;
};

const statusConfig = {
  pending: { color: 'bg-gray-100 text-gray-700', icon: Clock, label: 'Pending' },
  processing: { color: 'bg-blue-100 text-blue-700', icon: Package, label: 'Processing' },
  shipped: { color: 'bg-yellow-100 text-yellow-700', icon: Truck, label: 'Shipped' },
  delivered: { color: 'bg-green-100 text-green-700', icon: CheckCircle, label: 'Delivered' },
};

type Props = {
  orders: Order[];
};

export default function PurchaseHistoryCards({ orders }: Props) {
  return (
    <div className="md:hidden grid gap-4">
      {orders.map((order) => {
        const config = statusConfig[order.status];
        const StatusIcon = config.icon;
        return (
          <div key={order.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{order.id}</h3>
                <p className="text-sm text-gray-600">{new Date(order.date).toLocaleDateString()}</p>
              </div>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${config.color}`}>
                <StatusIcon size={16} />
                <span className="font-medium">{config.label}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-600 mb-1">Items</p>
                <p className="text-lg font-semibold text-gray-900">{order.items}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Amount</p>
                <p className="text-lg font-semibold text-gray-900">${order.total.toLocaleString()}</p>
              </div>
            </div>

            <Link
              href={`/tracking?orderId=${order.id}`}
              className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Track Order
            </Link>
          </div>
        );
      })}
    </div>
  );
}
