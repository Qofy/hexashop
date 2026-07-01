'use client';

import { useKidsProducts } from '@/data/mendata/useKidsProducts';
import { content } from '@/data/componentDatas/content_context';
import ProductCard from '../ProductCard';

type Props = {
  category?: 'latest' | 'featured' | 'casual' | 'trending';
  limit?: number;
  title?: string;
  description?: string;
};

export default function KidsProducts({
  category = 'latest',
  limit,
  title,
  description,
}: Props) {
  const { data: products = [], isLoading, error, isError } = useKidsProducts(
    category,
    limit
  );
  const kidsContent = content.Kids;

  return (
    <div className="py-12 px-6">
      {/* Header */}
      {(title || description) && (
        <div className="mb-8">
          {title && <h2 className="text-4xl font-bold text-gray-900">{title}</h2>}
          {description && (
            <p className="text-gray-600 mt-2 max-w-2xl">{description}</p>
          )}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">{kidsContent?.loadingMessage}</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-700 font-semibold">
            {kidsContent?.errorMessage}{error instanceof Error ? error.message : 'Unknown error'}
          </p>
        </div>
      )}

      {/* Products Grid */}
      {!isLoading && !isError && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">{kidsContent?.emptyMessage}</p>
        </div>
      )}
    </div>
  );
}
