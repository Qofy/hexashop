'use client';

import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

type ReturnRequest = {
  id: string;
  orderNumber: string;
  email: string;
  itemName: string;
  reason: string;
  itemCondition: string;
  purchaseDate: string;
  comments: string;
  timestamp: string;
};

const validationSchema = Yup.object().shape({
  orderNumber: Yup.string().required('Order number is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  itemName: Yup.string().required('Item name is required'),
  reason: Yup.string().required('Reason for return is required'),
  itemCondition: Yup.string().required('Item condition is required'),
  purchaseDate: Yup.string().required('Purchase date is required'),
  comments: Yup.string(),
});

export default function ReturnFormSection() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      orderNumber: '',
      email: '',
      itemName: '',
      reason: 'wrong-size',
      itemCondition: 'new-with-tags',
      purchaseDate: '',
      comments: '',
    },
    validationSchema,
    onSubmit: (values) => {
      try {
        const request: ReturnRequest = {
          id: Date.now().toString(),
          ...values,
          timestamp: new Date().toISOString(),
        };

        const requests = JSON.parse(localStorage.getItem('returnRequests') || '[]');
        requests.push(request);
        localStorage.setItem('returnRequests', JSON.stringify(requests));

        setSubmitted(true);
        setError(null);
        formik.resetForm();

        setTimeout(() => setSubmitted(false), 5000);
      } catch (err) {
        setError('Failed to submit return request. Please try again.');
      }
    },
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8" id="return-form">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Request a Return</h2>
      <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8">
        Fill out the form below to initiate your return request. We'll review it and send you a shipping label within 24 hours.
      </p>

      {submitted && (
        <div className="mb-6 p-4 md:p-6 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
          <div>
            <p className="text-sm md:text-base font-medium text-green-800">Return request submitted!</p>
            <p className="text-xs md:text-sm text-green-700">Check your email for the shipping label.</p>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 md:p-6 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
          <AlertCircle size={20} className="text-red-600 flex-shrink-0" />
          <p className="text-sm md:text-base text-red-800">{error}</p>
        </div>
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Order Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">Order Number</label>
            <input
              type="text"
              {...formik.getFieldProps('orderNumber')}
              className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 text-sm md:text-base"
              placeholder="e.g., HEX-2024-001234"
            />
            {formik.touched.orderNumber && formik.errors.orderNumber && (
              <p className="text-red-500 text-xs md:text-sm mt-1">{formik.errors.orderNumber}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">Email Address</label>
            <input
              type="email"
              {...formik.getFieldProps('email')}
              className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 text-sm md:text-base"
              placeholder="your@email.com"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs md:text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Item Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">Item Name</label>
            <input
              type="text"
              {...formik.getFieldProps('itemName')}
              className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 text-sm md:text-base"
              placeholder="e.g., Blue Denim Jacket"
            />
            {formik.touched.itemName && formik.errors.itemName && (
              <p className="text-red-500 text-xs md:text-sm mt-1">{formik.errors.itemName}</p>
            )}
          </div>

          {/* Purchase Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">Purchase Date</label>
            <input
              type="date"
              {...formik.getFieldProps('purchaseDate')}
              className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 text-sm md:text-base"
            />
            {formik.touched.purchaseDate && formik.errors.purchaseDate && (
              <p className="text-red-500 text-xs md:text-sm mt-1">{formik.errors.purchaseDate}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Return Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">Reason for Return</label>
            <select
              {...formik.getFieldProps('reason')}
              className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 text-sm md:text-base cursor-pointer"
            >
              <option value="wrong-size">Wrong Size</option>
              <option value="wrong-item">Wrong Item Received</option>
              <option value="defective">Defective/Damaged</option>
              <option value="not-as-described">Not as Described</option>
              <option value="poor-quality">Poor Quality</option>
              <option value="changed-mind">Changed My Mind</option>
              <option value="other">Other</option>
            </select>
            {formik.touched.reason && formik.errors.reason && (
              <p className="text-red-500 text-xs md:text-sm mt-1">{formik.errors.reason}</p>
            )}
          </div>

          {/* Item Condition */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">Item Condition</label>
            <select
              {...formik.getFieldProps('itemCondition')}
              className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 text-sm md:text-base cursor-pointer"
            >
              <option value="new-with-tags">New with Tags</option>
              <option value="new-no-tags">New, No Tags</option>
              <option value="lightly-used">Lightly Used</option>
              <option value="damaged">Damaged</option>
            </select>
            {formik.touched.itemCondition && formik.errors.itemCondition && (
              <p className="text-red-500 text-xs md:text-sm mt-1">{formik.errors.itemCondition}</p>
            )}
          </div>
        </div>

        {/* Comments */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">Additional Comments (Optional)</label>
          <textarea
            {...formik.getFieldProps('comments')}
            rows={4}
            className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 text-sm md:text-base resize-none"
            placeholder="Tell us more about your return reason..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full md:w-auto flex items-center justify-center gap-2 px-6 md:px-8 py-2 md:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm md:text-base"
        >
          <Send size={18} />
          Submit Return Request
        </button>
      </form>
    </div>
  );
}
