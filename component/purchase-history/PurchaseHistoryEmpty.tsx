import Link from 'next/link';
import { Package } from 'lucide-react';

export default function PurchaseHistoryEmpty() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-12 text-center">
      <Package size={48} className="mx-auto text-gray-400 mb-4" />
      <h2 className="text-2xl font-bold text-gray-900 mb-2">No Orders Yet</h2>
      <p className="text-gray-600 mb-6">You haven't made any purchases yet.</p>
      <Link
        href="/men"
        className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Start Shopping
      </Link>
    </div>
  );
}
