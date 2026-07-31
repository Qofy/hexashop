'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Section from '@/component/Section';
import Container from '@/component/Container';
import { content } from '@/data/componentDatas/content_context';

function FAQItem({ item }: { item: { id: number; question: string; answer: string } }) {
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

export default function FAQs() {
  const faqContent = content.FAQs;

  return (
    <Section bgColor="bg-white" padding="md">
      <Container>
        <div className="h-6 md:h-8"></div>

        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {faqContent?.title}
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {faqContent?.description}
          </p>
        </div>

        {/* FAQs Grid */}
        <div className="max-w-3xl mx-auto">
          {faqContent?.items?.map((faq) => (
            <FAQItem key={faq.id} item={faq} />
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 md:mt-16 text-center bg-body-bg rounded-lg p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {faqContent?.contactTitle}
          </h2>
          <p className="text-base md:text-lg text-gray-700 mb-6">
            {faqContent?.contactDescription}
          </p>
          <a
            href="/contactUs"
            className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            {faqContent?.contactButtonText}
          </a>
        </div>
      </Container>
    </Section>
  );
}
