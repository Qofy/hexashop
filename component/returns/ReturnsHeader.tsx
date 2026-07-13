import { RotateCcw } from 'lucide-react';

export default function ReturnsHeader() {
  return (
    <div className="py-6 md:py-12 px-4 md:px-6 bg-gradient-to-r from-green-50 to-green-100 text-center">
      <div className="flex justify-center mb-4">
        <RotateCcw size={48} className="text-green-600" />
      </div>
      <h1 className="text-2xl md:text-4xl font-bold text-gray-900">Returns & Exchanges</h1>
      <p className="text-sm md:text-base text-gray-600 mt-2">
        We want you to be completely satisfied. Easy 30-day returns on all items.
      </p>
    </div>
  );
}
