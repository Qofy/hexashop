import { Sparkles, Check } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { closeCheckout, resetFormData } from '@/slices/checkoutSlice';
import type { RootState } from '@/store/store';

type Props = {
  checkoutContent: any;
  isOpen: boolean;
};

export default function CongratulationsScreen({ checkoutContent, isOpen }: Props) {
  const dispatch = useAppDispatch();
  const { orderId, trackingNumber, orderTotal } = useAppSelector((state: RootState) => state.checkout);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-500 ease-in-out ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
      />

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ease-in-out ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl text-center">
          {/* Celebration Animation */}
          <div className="mb-6 flex justify-center gap-2">
            <Sparkles className="w-8 h-8 text-yellow-400 animate-bounce" />
            <Sparkles className="w-8 h-8 text-yellow-400 animate-bounce" style={{ animationDelay: '0.1s' }} />
            <Sparkles className="w-8 h-8 text-yellow-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {checkoutContent?.congratulations.title}
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            {checkoutContent?.congratulations.description}
          </p>
          <p className="text-sm text-gray-500 mb-6">
            {checkoutContent?.congratulations.thankYouMessage}
          </p>

          {/* Order Details */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 mb-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">{checkoutContent?.congratulations.orderIdLabel}</span>
              <span className="font-semibold text-gray-900">{orderId}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">{checkoutContent?.congratulations.trackingNumberLabel}</span>
              <span className="font-semibold text-green-600">{trackingNumber}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">{checkoutContent?.congratulations.totalAmountLabel}</span>
              <span className="font-bold text-blue-600">${orderTotal.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">{checkoutContent?.congratulations.deliveryLabel}</span>
              <span className="text-sm font-semibold text-gray-900">{checkoutContent?.congratulations.deliveryTime}</span>
            </div>
          </div>

          <button
            onClick={() => {
              dispatch(closeCheckout());
              dispatch(resetFormData());
            }}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            <Check size={20} />
            {checkoutContent?.congratulations.doneButtonText}
          </button>
        </div>
      </div>
    </>
  );
}
