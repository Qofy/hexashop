import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { closeCheckout, resetFormData, showCongratulations } from '@/slices/checkoutSlice';
import type { RootState } from '@/store/store';

type Props = {
  checkoutContent: any;
  isOpen: boolean;
};

export default function OrderConfirmation({ checkoutContent, isOpen }: Props) {
  const dispatch = useAppDispatch();
  const orderTotal = useAppSelector((state: RootState) => state.checkout.orderTotal);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-500 ease-in-out ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => {
          dispatch(closeCheckout());
          dispatch(resetFormData());
        }}
      />

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ease-in-out ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{checkoutContent?.orderConfirmation.title}</h2>
          <p className="text-gray-600 mb-6">
            {checkoutContent?.orderConfirmation.description}
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-gray-600">{checkoutContent?.orderConfirmation.totalLabel}</p>
            <p className="text-2xl font-bold text-gray-900">${orderTotal.toLocaleString()}</p>
          </div>
          <button
            onClick={() => dispatch(showCongratulations())}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            {checkoutContent?.orderConfirmation.continueButtonText}
          </button>
        </div>
      </div>
    </>
  );
}
