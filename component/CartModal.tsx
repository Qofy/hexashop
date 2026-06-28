'use client';

import Image from 'next/image';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { closeCart, removeFromCart, updateQuantity } from '@/slices/cartSlice';
import { openCheckout } from '@/slices/checkoutSlice';
import CheckoutModal from './CheckoutModal';

export default function CartModal() {
  const dispatch = useAppDispatch();
  const { items, isOpen } = useAppSelector(state => state.cart);

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-500 ease-in-out ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => dispatch(closeCart())}
      />

      {/* Modal */}
      <div className={`fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col transition-transform duration-500 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">Shopping Cart</h2>
          <button
            onClick={() => dispatch(closeCart())}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center text-gray-500 mt-12">
              <p className="text-lg">Your cart is empty</p>
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
                      <p className="text-blue-600 font-bold">${item.price}</p>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 border rounded-lg">
                      <button
                        onClick={() =>
                          dispatch(updateQuantity({
                            id: item.id,
                            quantity: item.quantity - 1,
                          }))
                        }
                        className="p-1 hover:bg-gray-100"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-3 py-1 text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          dispatch(updateQuantity({
                            id: item.id,
                            quantity: item.quantity + 1,
                          }))
                        }
                        className="p-1 hover:bg-gray-100"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-6 space-y-4">
            <div className="flex justify-between text-xl font-bold">
              <span>Total:</span>
              <span>${total.toLocaleString()}</span>
            </div>
            <button
              onClick={() => {
                dispatch(closeCart());
                dispatch(openCheckout());
              }}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
      <CheckoutModal />
    </>
  );
}
