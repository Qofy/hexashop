'use client';

import ReturnsHeader from './ReturnsHeader';
import ReturnPolicySection from './ReturnPolicySection';
import StepsSection from './StepsSection';
import ReturnFormSection from './ReturnFormSection';
import ReturnFAQSection from './ReturnFAQSection';

export default function ReturnsClient() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16 md:pt-20">
      <ReturnsHeader />

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Return Policy */}
        <ReturnPolicySection />

        {/* Steps */}
        <div className="mt-12 md:mt-16">
          <StepsSection />
        </div>

        {/* Return Form */}
        <div className="mt-12 md:mt-16">
          <ReturnFormSection />
        </div>

        {/* FAQs */}
        <div className="mt-12 md:mt-16">
          <ReturnFAQSection />
        </div>
      </div>
    </div>
  );
}
