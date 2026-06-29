'use client';

import { X, Sparkles, Check } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { closeCheckout, updateFormData, orderSuccess, resetFormData, showCongratulations, hideCongratulations, placeOrder } from '@/slices/checkoutSlice';
import { clearCart } from '@/slices/cartSlice';
import { content } from '@/data/componentDatas/content_context';
import type { RootState } from '@/store/store';
import { FormEvent } from 'react';

export default function CheckoutModal() {
  const dispatch = useAppDispatch();
  const { isOpen, formData, loading, success, orderTotal, showCongratulations: showCongrats, orderId } = useAppSelector((state: RootState) => state.checkout);
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const checkoutContent = content.Checkout;

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
      alert(checkoutContent?.validationMessage || 'Please fill in all fields');
      return;
    }

    // Dispatch placeOrder immediately to set loading state
    dispatch(placeOrder({ total, itemCount: cartItems.length }));

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

          {/* Content */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{checkoutContent?.form.personalInfo}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder={checkoutContent?.form.firstNamePlaceholder}
                    value={formData.firstName || ''}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder={checkoutContent?.form.lastNamePlaceholder}
                    value={formData.lastName || ''}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <input
                    type="email"
                    placeholder={checkoutContent?.form.emailPlaceholder}
                    value={formData.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="tel"
                    placeholder={checkoutContent?.form.phonePlaceholder}
                    value={formData.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{checkoutContent?.form.shippingAddress}</h3>
                <input
                  type="text"
                  placeholder={checkoutContent?.form.addressPlaceholder}
                  value={formData.address || ''}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                />
                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder={checkoutContent?.form.cityPlaceholder}
                    value={formData.city || ''}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder={checkoutContent?.form.statePlaceholder}
                    value={formData.state || ''}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder={checkoutContent?.form.zipCodePlaceholder}
                    value={formData.zipCode || ''}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{checkoutContent?.form.paymentMethod}</h3>
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
                          ? checkoutContent?.form.creditCardLabel
                          : method === 'debit-card'
                          ? checkoutContent?.form.debitCardLabel
                          : method === 'upi'
                          ? checkoutContent?.form.upiLabel
                          : checkoutContent?.form.codLabel}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">{checkoutContent?.form.subtotalLabel}</span>
                  <span className="font-semibold">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">{checkoutContent?.form.shippingLabel}</span>
                  <span className="font-semibold">{checkoutContent?.form.freeShipping}</span>
                </div>
                <div className="border-t pt-2 flex justify-between items-center">
                  <span className="font-bold text-gray-900">{checkoutContent?.form.totalLabel}</span>
                  <span className="font-bold text-xl text-blue-600">${total.toLocaleString()}</span>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? checkoutContent?.form.processingButton : checkoutContent?.form.placeOrderButton}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
