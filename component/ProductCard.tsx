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
      <div className="bg-header-bg w-74 shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      {/* Product Image */}
      <div className="relative w-full h-74 bg-gray-100">
        <Image
          src={product.image.src}
          alt={product.clothName}
          fill
          className="object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 h-30">
        <div className='flex  items-center justify-between'>
        <h3 className="font-semibold text-gray-800 truncate">
          {product.clothName}
        </h3>
        {/* Star Rating */}
           <div className="flex items-center gap-1 mt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={12}
              className={
                i < Math.round(product.starRate)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }
            />
          ))}
          <span className="text-sm text-gray-600 ml-1">
            ({product.starRate})
          </span>
        </div>
        </div>

        {/* Price */}
        <div className='flex justify-between items-center mt-4'>
        <p className="font-bold text-gray-900 mt-2">
          ${product.price}
        </p>       
          <div className='flex gap-1.5'>
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
              className='hover:bg-gray-100 p-1 rounded transition-colors'
              aria-label={isFavorited ? `Remove ${product.clothName} from favorites` : `Add ${product.clothName} to favorites`}
              aria-pressed={isFavorited}
            >
              <Heart
                size={20}
                className={`cursor-pointer ${
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
              className='hover:bg-gray-100 p-1 rounded transition-colors'
              aria-label={`Add ${product.clothName} to cart`}
            >
              <ShoppingCart size={20} className='cursor-pointer' aria-hidden="true"/>
            </button>
          </div>
        </div>

        {/* Actions */}
        {/* <div className="flex gap-2 mt-4">
          {/* Add to Cart Button *}
          <button
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-medium transition-colors ${
              product.inCart
                ? 'bg-green-500 text-white'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            <ShoppingCart size={18} />
            {product.inCart ? 'In Cart' : 'Add Cart'}
          </button>

          {/* Favorite Button }
          <button
            className={`py-2 px-3 rounded-lg transition-colors ${
              product.isFavorite
                ? 'bg-red-100'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <Heart
              size={20}
              className={
                product.isFavorite
                  ? 'fill-red-500 text-red-500'
                  : 'text-gray-600'
              }
            />
          </button>
        </div> */}
      </div>
      </div>
    </Link>
  );
}
