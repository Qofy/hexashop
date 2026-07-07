'use client';

import { X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { closeCheckout } from '@/slices/checkoutSlice';
import { content } from '@/data/componentDatas/content_context';
import type { RootState } from '@/store/store';
import CheckoutForm from './checkout/CheckoutForm';
import OrderConfirmation from './checkout/OrderConfirmation';
import CongratulationsScreen from './checkout/CongratulationsScreen';

export default function CheckoutModal() {
  const dispatch = useAppDispatch();
  const { isOpen, loading, success, showCongratulations: showCongrats } = useAppSelector((state: RootState) => state.checkout);
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const checkoutContent = content.Checkout;

  // Congratulations Screen
  if (success && showCongrats) {
    return <CongratulationsScreen checkoutContent={checkoutContent} isOpen={isOpen} />;
  }

  // Order Confirmation Screen
  if (success) {
    return <OrderConfirmation checkoutContent={checkoutContent} isOpen={isOpen} />;
  }

  // Main Checkout Form
  return (
    <>
      <div
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-500 ease-in-out ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => dispatch(closeCheckout())}
      />

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ease-in-out overflow-y-auto ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-white rounded-lg max-w-2xl w-full mx-4 shadow-2xl my-8">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold">{checkoutContent?.form.title}</h2>
            <button
              onClick={() => dispatch(closeCheckout())}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X size={24} />
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6">
            <CheckoutForm checkoutContent={checkoutContent} total={total} loading={loading} />
          </div>
        </div>
      </div>
    </>
  );
}
