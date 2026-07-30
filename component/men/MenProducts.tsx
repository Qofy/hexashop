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
    <>
      {/* Header */}
      {(title || description) && (
        <div className="mb-8 mt-12 md:mb-12">
          {title && <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{title}</h2>}
          {description && (
            <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center min-h-64">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-base md:text-lg text-gray-600">Loading products...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 md:p-8 text-center">
          <p className="text-base md:text-lg text-red-700 font-semibold leading-relaxed">
            Error loading products: {error instanceof Error ? error.message : 'Unknown error'}
          </p>
        </div>
      )}

      {/* Products Grid */}
      {!isLoading && !isError && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && products.length === 0 && (
        <div className="text-center py-12 md:py-16">
          <p className="text-base md:text-lg text-gray-600">No products found</p>
        </div>
      )}
    </>
  );
}
