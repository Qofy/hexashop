'use client';

import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  category: string;
  timestamp: string;
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  subject: Yup.string().required('Subject is required'),
  category: Yup.string().required('Category is required'),
  message: Yup.string().min(10, 'Message must be at least 10 characters').required('Message is required'),
});

export default function ContactFormSection() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      category: 'general',
      message: '',
    },
    validationSchema,
    onSubmit: (values) => {
      try {
        const submission: ContactSubmission = {
          id: Date.now().toString(),
          ...values,
          timestamp: new Date().toISOString(),
        };

        const submissions = JSON.parse(localStorage.getItem('supportSubmissions') || '[]');
        submissions.push(submission);
        localStorage.setItem('supportSubmissions', JSON.stringify(submissions));

        setSubmitted(true);
        setError(null);
        formik.resetForm();

        setTimeout(() => setSubmitted(false), 5000);
      } catch (err) {
        setError('Failed to submit form. Please try again.');
      }
    },
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8" id="contact">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Contact Support</h2>
      <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8">
        Can't find what you're looking for? Send us a message and we'll get back to you within 24 hours.
      </p>

      {submitted && (
        <div className="mb-6 p-4 md:p-6 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
          <div>
            <p className="text-sm md:text-base font-medium text-green-800">Message sent successfully!</p>
            <p className="text-xs md:text-sm text-green-700">We'll respond to your email within 24 hours.</p>
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
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">Your Name</label>
            <input
              type="text"
              {...formik.getFieldProps('name')}
              className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm md:text-base"
              placeholder="John Doe"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-xs md:text-sm mt-1">{formik.errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">Email Address</label>
            <input
              type="email"
              {...formik.getFieldProps('email')}
              className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm md:text-base"
              placeholder="john@example.com"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs md:text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">Subject</label>
            <input
              type="text"
              {...formik.getFieldProps('subject')}
              className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm md:text-base"
              placeholder="How can we help?"
            />
            {formik.touched.subject && formik.errors.subject && (
              <p className="text-red-500 text-xs md:text-sm mt-1">{formik.errors.subject}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">Category</label>
            <select
              {...formik.getFieldProps('category')}
              className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm md:text-base cursor-pointer"
            >
              <option value="general">General Inquiry</option>
              <option value="order">Order Issue</option>
              <option value="shipping">Shipping Question</option>
              <option value="return">Return/Exchange</option>
              <option value="payment">Payment Issue</option>
              <option value="product">Product Quality</option>
              <option value="account">Account Help</option>
            </select>
            {formik.touched.category && formik.errors.category && (
              <p className="text-red-500 text-xs md:text-sm mt-1">{formik.errors.category}</p>
            )}
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">Message</label>
          <textarea
            {...formik.getFieldProps('message')}
            rows={6}
            className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm md:text-base resize-none"
            placeholder="Please describe your issue in detail..."
          />
          {formik.touched.message && formik.errors.message && (
            <p className="text-red-500 text-xs md:text-sm mt-1">{formik.errors.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full md:w-auto flex items-center justify-center gap-2 px-6 md:px-8 py-2 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm md:text-base"
        >
          <Send size={18} />
          Send Message
        </button>
      </form>
    </div>
  );
}
