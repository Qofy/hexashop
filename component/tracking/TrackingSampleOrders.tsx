'use client';

type Order = {
  id: string;
  trackingNumber: string;
  date: string;
  total: number;
  items: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
};

type Props = {
  mockOrders: { [key: string]: Order };
  onSelectOrder: (orderId: string) => void;
};

export default function TrackingSampleOrders({ mockOrders, onSelectOrder }: Props) {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
      <p className="text-sm text-gray-700 mb-4">
        Try these sample order IDs to see tracking in action:
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        {Object.keys(mockOrders).map(orderId => (
          <button
            key={orderId}
            onClick={() => onSelectOrder(orderId)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            {orderId}
          </button>
        ))}
      </div>
    </div>
  );
}
