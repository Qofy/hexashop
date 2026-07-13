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
    question: 'How do I know which size to order?',
    answer: 'Start by taking your measurements using our measurement guide. Compare your measurements to our size charts for Men\'s, Women\'s, or Kids\' clothing. If you\'re between sizes, we recommend sizing up for comfort. You can also use our size converter to check equivalent sizes in different regions.',
  },
  {
    id: 'faq-2',
    question: 'Do your sizes run small or large?',
    answer: 'Our sizes generally follow standard US sizing and run true to size. However, fit can vary by item style and fabric. We recommend checking individual product descriptions and customer reviews for fit feedback. When in doubt, size up.',
  },
  {
    id: 'faq-3',
    question: 'What if I order the wrong size?',
    answer: 'No problem! We offer a 30-day return policy. If your item doesn\'t fit, simply initiate a return request from your account. We\'ll provide a prepaid shipping label, and once we receive it, we can help you exchange it for the correct size.',
  },
  {
    id: 'faq-4',
    question: 'Are your measurements in inches or centimeters?',
    answer: 'All measurements in our size charts are in inches. If you prefer centimeters, simply multiply the inch measurement by 2.54.',
  },
  {
    id: 'faq-5',
    question: 'Do you have plus-size options?',
    answer: 'Yes! We carry extended sizes including 2XL and larger. Check individual product pages for available sizes. Our size chart includes measurements for all available sizes.',
  },
  {
    id: 'faq-6',
    question: 'How should I measure my sleeve length?',
    answer: 'Stand with your arm slightly bent. Measure from the center back of your neck, across your shoulder, and down to your wrist. Your arm should be relaxed but not fully extended. This gives the most accurate sleeve length.',
  },
  {
    id: 'faq-7',
    question: 'What\'s the difference between my size and the size listed on clothing?',
    answer: 'The size label (like M or L) is based on standard sizing charts, but the actual fit depends on the garment\'s cut, fabric, and stretch. Two different brands may fit differently in the same size. This is why we recommend checking measurements and customer reviews.',
  },
  {
    id: 'faq-8',
    question: 'How do I measure inseam for pants?',
    answer: 'Wear shoes you plan to wear with the pants. Stand straight with your feet shoulder-width apart. Measure from your inner thigh down to your ankle bone or desired pants length. For the most accurate fit, ask someone to help with this measurement.',
  },
];

export default function SizeGuideFAQSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8">Size FAQs</h2>

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
