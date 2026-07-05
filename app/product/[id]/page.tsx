'use client';

import { useState, useEffect, use } from 'react';
import { useAppSelector } from '@/store/hooks';
import type { RootState } from '@/store/store';
import Breadcrumb from '@/component/product/Breadcrumb';
import ProductImage from '@/component/product/ProductImage';
import ProductHeader from '@/component/product/ProductHeader';
import SizeSelector from '@/component/product/SizeSelector';
import ProductActions from '@/component/product/ProductActions';
import ShippingInfo from '@/component/product/ShippingInfo';
import SimilarProducts from '@/component/product/SimilarProducts';

type Product = {
  id: number;
  image: { src: string; height: number; width: number; blurDataURL?: string };
  clothName: string;
  price: number;
  starRate: number;
  inCart: boolean;
  isFavorite: boolean;
};

export default function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const productId = parseInt(id);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts1, setRelatedProducts1] = useState<Product[]>([]);
  const [relatedProducts2, setRelatedProducts2] = useState<Product[]>([]);
  const [relatedProducts3, setRelatedProducts3] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const favorites = useAppSelector((state: RootState) => state.favorites.items);
  const isFavorited = product ? favorites.some(item => item.id === product.id) : false;

  useEffect(() => {
    const fetchProductAndRelated = async () => {
      try {
        setLoading(true);

        // Determine category based on product ID
        let currentCategory = 'men';
        if (productId >= 41 && productId <= 80) currentCategory = 'women';
        if (productId >= 81) currentCategory = 'kids';

        // Fetch current product from its category
        const currentResponse = await fetch(`/api/${currentCategory}`);
        const currentData = await currentResponse.json();

        if (currentData.success && currentData.data) {
          const currentProducts = currentData.data;
          const currentProduct = currentProducts.find((p: Product) => p.id === productId);

          if (currentProduct) {
            setProduct(currentProduct);

            // Fetch products from all categories for mixed recommendations
            const categories = ['men', 'women', 'kids'];
            const allProducts: Product[] = [];

            for (const category of categories) {
              const response = await fetch(`/api/${category}`);
              const data = await response.json();
              if (data.success && data.data) {
                allProducts.push(...data.data);
              }
            }

            const availableProducts = allProducts
              .filter((p: Product) => p.id !== productId)
              .sort(() => Math.random() - 0.5);

            const mixedProducts1 = availableProducts.slice(0, 4);
            const mixedProducts2 = availableProducts.slice(4, 8);
            const mixedProducts3 = availableProducts.slice(8, 12);

            setRelatedProducts1(mixedProducts1);
            setRelatedProducts2(mixedProducts2);
            setRelatedProducts3(mixedProducts3);
          } else {
            setError('Product not found');
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndRelated();
  }, [productId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600">Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-red-600">{error || 'Product not found'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">

        <Breadcrumb productName={product.clothName} />

        {/* Product Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 bg-white rounded-lg shadow-lg p-8">

          <ProductImage src={product.image.src} alt={product.clothName} />

          {/* Product Information */}
          <div className="flex flex-col justify-between">
            <ProductHeader
              name={product.clothName}
              price={product.price}
              rating={product.starRate}
            />

            <SizeSelector />

            <ProductActions product={product} isFavorited={isFavorited} />

            <ShippingInfo />
          </div>
        </div>

        <SimilarProducts products={relatedProducts1} />
        <SimilarProducts products={relatedProducts2} />
        <SimilarProducts products={relatedProducts3} />

      </div>
    </div>
  );
}
