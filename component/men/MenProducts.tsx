'use client';

import { useMenProducts } from '@/data/mendata/useMenProducts';
import ProductCard from '../ProductCard';

type Props = {
  category?: 'latest' | 'featured' | 'casual' | 'trending';
  limit?: number;
  title?: string;
  description?: string;
};

export default function MenProducts({
  category = 'latest',
  limit,
  title,
  description,
}: Props) {
  const { data: products = [], isLoading, error, isError } = useMenProducts(
    category,
    limit
  );

  return (
    <div className="py-6 md:py-12 px-4 md:px-6">
      {/* Header */}
      {(title || description) && (
        <div className="mb-6 md:mb-8">
          {title && <h2 className="text-2xl md:text-4xl font-bold text-gray-900">{title}</h2>}
          {description && (
            <p className="text-sm md:text-base text-gray-600 mt-1 md:mt-2 max-w-2xl">{description}</p>
          )}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center h-40 md:h-64">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-sm md:text-base text-gray-600">Loading products...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 md:p-6 text-center">
          <p className="text-sm md:text-base text-red-700 font-semibold">
            Error loading products: {error instanceof Error ? error.message : 'Unknown error'}
          </p>
        </div>
      )}

      {/* Products Grid */}
      {!isLoading && !isError && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && products.length === 0 && (
        <div className="text-center py-6 md:py-12">
          <p className="text-sm md:text-lg text-gray-600">No products found</p>
        </div>
      )}
    </div>
  );
}
