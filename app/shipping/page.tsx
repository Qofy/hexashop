'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Section from '@/component/Section';
import Container from '@/component/Container';
import { content } from '@/data/componentDatas/content_context';

function ShippingOptionCard({ option }: { option: { id: number; name: string; timeframe: string; cost: string; description: string } }) {
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6 md:p-8 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg md:text-xl font-bold text-gray-900">{option.name}</h3>
          <p className="text-sm md:text-base text-gray-600 mt-1">{option.timeframe}</p>
        </div>
        <div className="text-right">
          <p className="text-lg md:text-xl font-bold text-gray-900">{option.cost}</p>
        </div>
      </div>
      <p className="text-sm md:text-base text-gray-700 leading-relaxed">{option.description}</p>
    </div>
  );
}

function ShippingFAQItem({ item }: { item: { id: number; question: string; answer: string } }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-300 rounded-lg mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 md:px-6 py-4 md:py-5 flex items-center justify-between hover:bg-body-bg transition-colors"
      >
        <h3 className="text-base md:text-lg font-semibold text-gray-900 text-left">
          {item.question}
        </h3>
        <ChevronDown
          size={20}
          className={`flex-shrink-0 ml-4 text-gray-600 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="px-4 md:px-6 py-4 md:py-5 border-t border-gray-300 bg-gray-50">
          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
            {item.answer}
          </p>
        </div>
      )}
    </div>
  );
}

export default function Shipping() {
  const shippingContent = content.Shipping;

  return (
    <Section bgColor="bg-white" padding="md">
      <Container>
        <div className="h-10 md:h-8"></div>

        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {shippingContent?.title}
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {shippingContent?.description}
          </p>
        </div>

        {/* Shipping Options */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 md:mb-10">Shipping Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {shippingContent?.shippingOptions?.map((option) => (
              <ShippingOptionCard key={option.id} option={option} />
            ))}
          </div>
        </div>

        {/* International Shipping */}
        <div className="mb-16 md:mb-20 bg-blue-50 rounded-lg p-8 md:p-12 border border-blue-200">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {shippingContent?.internationalTitle}
          </h2>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            {shippingContent?.internationalDescription}
          </p>
        </div>

        {/* Order Tracking */}
        <div className="mb-16 md:mb-20 bg-green-50 rounded-lg p-8 md:p-12 border border-green-200">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {shippingContent?.trackingTitle}
          </h2>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            {shippingContent?.trackingDescription}
          </p>
        </div>

        {/* Shipping FAQs */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 md:mb-10">
            {shippingContent?.faqsTitle}
          </h2>
          <div className="max-w-3xl mx-auto">
            {shippingContent?.faqs?.map((faq) => (
              <ShippingFAQItem key={faq.id} item={faq} />
            ))}
          </div>
        </div>

        {/* Support CTA */}
        <div className="text-center bg-body-bg rounded-lg p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-base md:text-lg text-gray-700 mb-6">
            Our customer support team is ready to help you with any shipping inquiries.
          </p>
          <a
            href="/contactUs"
            className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </Container>
    </Section>
  );
}
