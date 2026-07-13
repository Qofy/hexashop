'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

const faqs: FAQ[] = [
  {
    id: 'ship-1',
    category: 'Shipping',
    question: 'How long does shipping take?',
    answer: 'Standard shipping typically takes 5-7 business days. Express shipping options are available at checkout for faster delivery. International orders may take 2-3 weeks depending on destination.',
  },
  {
    id: 'ship-2',
    category: 'Shipping',
    question: 'Do you offer free shipping?',
    answer: 'Yes! We offer free shipping on all orders over $50. Orders under $50 have a flat shipping fee of $5.99.',
  },
  {
    id: 'return-1',
    category: 'Returns',
    question: 'What is your return policy?',
    answer: 'We offer a 30-day money-back guarantee on all items. Products must be in original condition with tags attached. Simply initiate a return from your account and we\'ll provide a prepaid shipping label.',
  },
  {
    id: 'return-2',
    category: 'Returns',
    question: 'How long does refund processing take?',
    answer: 'Once we receive your return, refunds are processed within 5-7 business days. The refund amount will appear in your original payment method.',
  },
  {
    id: 'payment-1',
    category: 'Payment',
    question: 'What payment methods do you accept?',
    answer: 'We accept credit cards (Visa, Mastercard, American Express), debit cards, UPI, and Cash on Delivery for eligible locations.',
  },
  {
    id: 'payment-2',
    category: 'Payment',
    question: 'Is my payment information secure?',
    answer: 'Yes, we use industry-standard SSL encryption and PCI compliance to protect your payment information. Your card details are never stored on our servers.',
  },
  {
    id: 'account-1',
    category: 'Account',
    question: 'How do I reset my password?',
    answer: 'Click "Forgot Password" on the login page, enter your email, and we\'ll send you a reset link. Follow the instructions in the email to create a new password.',
  },
  {
    id: 'account-2',
    category: 'Account',
    question: 'How can I update my profile information?',
    answer: 'Go to My Account > Profile to update your name, email, and phone number. Changes are saved immediately.',
  },
];

export default function FAQSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...new Set(faqs.map(faq => faq.category))];

  const filteredFaqs = selectedCategory === 'All'
    ? faqs
    : faqs.filter(faq => faq.category === selectedCategory);

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8">Frequently Asked Questions</h2>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* FAQs Accordion */}
      <div className="space-y-3 md:space-y-4">
        {filteredFaqs.map(faq => (
          <div key={faq.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
            <button
              onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
              className="w-full flex items-center justify-between px-4 md:px-6 py-3 md:py-4 hover:bg-gray-50 transition-colors"
            >
              <h3 className="text-sm md:text-base font-medium text-gray-900 text-left">{faq.question}</h3>
              <ChevronDown
                size={20}
                className={`text-gray-600 flex-shrink-0 ml-4 transition-transform ${
                  expandedId === faq.id ? 'rotate-180' : ''
                }`}
              />
            </button>

            {expandedId === faq.id && (
              <div className="px-4 md:px-6 py-4 md:py-5 border-t border-gray-200 bg-gray-50">
                <p className="text-xs md:text-sm text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredFaqs.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600 text-sm md:text-base">No FAQs found for this category.</p>
        </div>
      )}
    </div>
  );
}
