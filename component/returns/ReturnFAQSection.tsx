'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

type FAQ = {
  id: string;
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    id: 'faq-1',
    question: 'How long do I have to return an item?',
    answer: 'You have 30 days from the date of purchase to return any item. Items must be in original condition with tags attached and all accessories included.',
  },
  {
    id: 'faq-2',
    question: 'Do I have to pay for return shipping?',
    answer: 'No! We provide a prepaid return shipping label via email. Simply print the label and attach it to your package. There\'s no shipping cost for returns.',
  },
  {
    id: 'faq-3',
    question: 'Can I exchange an item instead of returning it?',
    answer: 'Yes! If you need a different size or color, you can request an exchange. Simply submit a return request and specify "Exchange" as your preference. We\'ll send you a new item once we receive yours.',
  },
  {
    id: 'faq-4',
    question: 'How long does it take to receive my refund?',
    answer: 'After we receive your return at our warehouse, we inspect the item (1-2 days) and process the refund (3-5 days). Total refund time is typically 5-7 business days from receiving your package.',
  },
  {
    id: 'faq-5',
    question: 'Can I return items purchased on sale or clearance?',
    answer: 'Regular sale items can be returned within our 30-day window. However, final sale or clearance items marked as "non-returnable" cannot be returned. Check the product page for details.',
  },
  {
    id: 'faq-6',
    question: 'What if the item is damaged when I return it?',
    answer: 'If the item arrives damaged or defective, we\'ll repair or replace it at no cost. If it was damaged due to your return, we may deduct a restocking fee of 20% from your refund.',
  },
  {
    id: 'faq-7',
    question: 'Can I return an item without the original packaging?',
    answer: 'Items in original packaging get full refunds. Items without original packaging may receive a reduced refund (up to 20% deduction) depending on condition.',
  },
  {
    id: 'faq-8',
    question: 'How do I track my return shipment?',
    answer: 'The return shipping label includes a tracking number. You can use this to track your package. We\'ll also send you an email notification when we receive your return.',
  },
];

export default function ReturnFAQSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8">Return FAQs</h2>

      <div className="space-y-3 md:space-y-4">
        {faqs.map(faq => (
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
    </div>
  );
}
