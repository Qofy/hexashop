import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function FavoritesEmpty() {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 md:p-12 text-center">
      <Heart size={48} className="mx-auto text-gray-300 mb-4" />
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">No Favorites Yet</h2>
      <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8">
        Start adding products to your favorites to see them here. Click the heart icon on any product to save it!
      </p>
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
        <Link
          href="/men"
          className="px-6 md:px-8 py-2 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base"
        >
          Browse Men
        </Link>
        <Link
          href="/women"
          className="px-6 md:px-8 py-2 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base"
        >
          Browse Women
        </Link>
        <Link
          href="/kids"
          className="px-6 md:px-8 py-2 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base"
        >
          Browse Kids
        </Link>
      </div>
    </div>
  );
}
