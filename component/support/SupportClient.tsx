'use client';

import SupportHeader from './SupportHeader';
import SupportCategoryCards from './SupportCategoryCards';
import FAQSection from './FAQSection';
import ContactFormSection from './ContactFormSection';

export default function SupportClient() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16 md:pt-20">
      <SupportHeader />

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Quick Access Categories */}
        <SupportCategoryCards />

        {/* FAQs */}
        <div className="mt-12 md:mt-16">
          <FAQSection />
        </div>

        {/* Contact Form */}
        <div className="mt-12 md:mt-16">
          <ContactFormSection />
        </div>
      </div>
    </div>
  );
}
