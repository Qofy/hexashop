'use client';

import { ShoppingCart, Heart } from 'lucide-react';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/slices/cartSlice';
import { addToFavorites, removeFromFavorites } from '@/slices/favoritesSlice';

type Product = {
  id: number;
  image: { src: string; height: number; width: number; blurDataURL?: string };
  clothName: string;
  price: number;
  starRate: number;
  inCart: boolean;
  isFavorite: boolean;
};

type Props = {
  product: Product;
  isFavorited: boolean;
};

export default function ProductActions({ product, isFavorited }: Props) {
  const dispatch = useAppDispatch();

  return (
    <div className="flex gap-4">
      <button
        onClick={() => dispatch(addToCart(product))}
        className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
      >
        <ShoppingCart size={20} />
        Add to Cart
      </button>
      <button
        onClick={() => {
          if (isFavorited) {
            dispatch(removeFromFavorites(product.id));
          } else {
            dispatch(addToFavorites(product));
          }
        }}
        className={`px-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors ${
          isFavorited
            ? 'bg-red-100 text-red-600 hover:bg-red-200'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        <Heart size={20} className={isFavorited ? 'fill-current' : ''} />
        {isFavorited ? 'Saved' : 'Save'}
      </button>
    </div>
  );
}
