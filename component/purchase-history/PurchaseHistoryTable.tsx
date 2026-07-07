import Link from 'next/link';
import { ArrowRight, Clock, Package, Truck, CheckCircle } from 'lucide-react';

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

export default function PurchaseHistoryTable({ orders }: Props) {
  return (
    <div className="hidden md:block bg-white rounded-lg shadow-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100 border-b border-gray-300">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Order ID</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Items</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {orders.map((order) => {
            const config = statusConfig[order.status];
            const StatusIcon = config.icon;
            return (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{new Date(order.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{order.items}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">${order.total.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${config.color}`}>
                    <StatusIcon size={16} />
                    <span className="font-medium">{config.label}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">
                  <Link
                    href={`/tracking?orderId=${order.id}`}
                    className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 group"
                  >
                    Track
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
