'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { MenProduct } from '@/data/mendata/mendata';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart } from '@/slices/cartSlice';
import { addToFavorites, removeFromFavorites } from '@/slices/favoritesSlice';
import type { RootState } from '@/store/store';

type Props = {
  product: MenProduct;
};

export default function ProductCard({ product }: Props) {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state: RootState) => state.favorites.items);
  const isFavorited = favorites.some(item => item.id === product.id);

  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-header-bg w-full shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer rounded-lg">
        {/* Product Image */}
        <div className="relative w-full h-40 sm:h-48 md:h-56 lg:h-64 bg-gray-100">
          <Image
            src={product.image.src}
            alt={product.clothName}
            fill
            className="object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="p-4 md:p-6 bg-white">
          {/* Title & Rating */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <h3 className="font-semibold text-sm md:text-base text-gray-800 truncate flex-1">
              {product.clothName}
            </h3>
            <div className="flex items-center gap-1 shrink-0">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={`${
                    i < Math.round(product.starRate)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-xs text-gray-600 ml-1">
                ({product.starRate})
              </span>
            </div>
          </div>

          {/* Price & Actions */}
          <div className="flex justify-between items-center gap-3">
            <p className="font-bold text-base md:text-lg text-gray-900">
              ${product.price}
            </p>
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (isFavorited) {
                    dispatch(removeFromFavorites(product.id));
                  } else {
                    dispatch(addToFavorites(product));
                  }
                }}
                className="hover:bg-gray-100 p-2 rounded-lg transition-colors"
                aria-label={isFavorited ? `Remove ${product.clothName} from favorites` : `Add ${product.clothName} to favorites`}
                aria-pressed={isFavorited}
              >
                <Heart
                  size={18}
                  className={`${
                    isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'
                  }`}
                  aria-hidden="true"
                />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  dispatch(addToCart(product));
                }}
                className="hover:bg-gray-100 p-2 rounded-lg transition-colors"
                aria-label={`Add ${product.clothName} to cart`}
              >
                <ShoppingCart size={18} className="cursor-pointer" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
