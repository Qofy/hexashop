'use client';

import { X, Sparkles, Check } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { closeCheckout, updateFormData, orderSuccess, resetFormData, showCongratulations, hideCongratulations } from '@/slices/checkoutSlice';
import { clearCart } from '@/slices/cartSlice';
import type { RootState } from '@/store/store';
import { FormEvent } from 'react';

export default function CheckoutModal() {
  const dispatch = useAppDispatch();
  const { isOpen, formData, loading, success, orderTotal, showCongratulations: showCongrats, orderId } = useAppSelector((state: RootState) => state.checkout);
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleInputChange = (field: string, value: string) => {
    dispatch(updateFormData({ [field]: value } as any));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.zipCode ||
      !formData.paymentMethod
    ) {
      alert('Please fill in all fields');
      return;
    }

    // Simulate order processing
    setTimeout(() => {
      dispatch(orderSuccess(total));
      dispatch(clearCart());
    }, 1500);
  };

  // Congratulations Screen
  if (success && showCongrats) {
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
              🎉 Congratulations!
            </h2>
            <p className="text-lg text-gray-600 mb-2">
              Your order has been placed successfully
            </p>
            <p className="text-sm text-gray-500 mb-6">
              {`We'll send you updates on your order status via email. Thank you for shopping with us!`}
            </p>

            {/* Order Details */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 mb-6 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-semibold text-gray-900">{orderId}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-bold text-blue-600">${orderTotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Expected Delivery:</span>
                <span className="text-sm font-semibold text-gray-900">5-7 Business Days</span>
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
              Done
            </button>
          </div>
        </div>
      </>
    );
  }

  // Order Confirmation Screen
  if (success) {
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. Your order has been confirmed and will be processed soon.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-gray-600">Order Total</p>
              <p className="text-2xl font-bold text-gray-900">${orderTotal.toLocaleString()}</p>
            </div>
            <button
              onClick={() => dispatch(showCongratulations())}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </>
    );
  }

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
            <h2 className="text-2xl font-bold">Checkout</h2>
            <button
              onClick={() => dispatch(closeCheckout())}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName || ''}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName || ''}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h3>
                <input
                  type="text"
                  placeholder="Address"
                  value={formData.address || ''}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                />
                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    value={formData.city || ''}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={formData.state || ''}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Zip Code"
                    value={formData.zipCode || ''}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
                <div className="space-y-3">
                  {['credit-card', 'debit-card', 'upi', 'cod'].map((method) => (
                    <label key={method} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={formData.paymentMethod === method}
                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="ml-3 text-gray-700">
                        {method === 'credit-card'
                          ? 'Credit Card'
                          : method === 'debit-card'
                          ? 'Debit Card'
                          : method === 'upi'
                          ? 'UPI'
                          : 'Cash on Delivery'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-semibold">Free</span>
                </div>
                <div className="border-t pt-2 flex justify-between items-center">
                  <span className="font-bold text-gray-900">Total:</span>
                  <span className="font-bold text-xl text-blue-600">${total.toLocaleString()}</span>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
