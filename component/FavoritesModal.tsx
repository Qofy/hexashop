'use client';

import Image from 'next/image';
import { X, Trash2, ShoppingCart } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { closeFavorites, removeFromFavorites } from '@/slices/favoritesSlice';
import { addToCart } from '@/slices/cartSlice';
import { content } from '@/data/componentDatas/content_context';

export default function FavoritesModal() {
  const dispatch = useAppDispatch();
  const { items, isOpen } = useAppSelector(state => state.favorites);
  const favoritesContent = content.Favorites;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-500 ease-in-out ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => dispatch(closeFavorites())}
        aria-hidden={!isOpen}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="favorites-title"
        hidden={!isOpen}
        className={`fixed left-0 top-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 id="favorites-title" className="text-2xl font-bold">{favoritesContent?.title}</h2>
          <button
            onClick={() => dispatch(closeFavorites())}
            className="p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Close favorites"
          >
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center text-gray-500 mt-12">
              <p className="text-lg">{favoritesContent?.emptyMessage}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="border rounded-lg p-4">
                  {/* Product Image & Info */}
                  <div className="flex gap-4 mb-3">
                    <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image.src}
                        alt={item.clothName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{item.clothName}</h3>
                      <p className="text-blue-600 font-bold">₹{item.price}</p>
                      <div className="flex gap-1 mt-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            className={`text-xs ${
                              i < Math.round(item.starRate)
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        dispatch(addToCart(item));
                        dispatch(removeFromFavorites(item.id));
                      }}
                      className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      <ShoppingCart size={16} />
                      {favoritesContent?.addToCartButton}
                    </button>
                    <button
                      onClick={() => dispatch(removeFromFavorites(item.id))}
                      className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
                      aria-label={`Remove ${item.clothName} from favorites`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
