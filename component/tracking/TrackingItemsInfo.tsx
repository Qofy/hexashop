import { Package } from 'lucide-react';

type Props = {
  itemCount: number;
};

export default function TrackingItemsInfo({ itemCount }: Props) {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
      <div className="flex items-center gap-3">
        <Package size={20} className="text-blue-600" />
        <div>
          <p className="text-sm text-gray-600">Items in this order</p>
          <p className="text-lg font-bold text-gray-900">{itemCount} item(s)</p>
        </div>
      </div>
    </div>
  );
}
