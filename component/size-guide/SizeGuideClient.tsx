'use client';

import SizeGuideHeader from './SizeGuideHeader';
import SizeChartSection from './SizeChartSection';
import MeasurementGuideSection from './MeasurementGuideSection';
import ConverterSection from './ConverterSection';
import SizeGuideFAQSection from './SizeGuideFAQSection';

export default function SizeGuideClient() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16 md:pt-20">
      <SizeGuideHeader />

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Size Charts */}
        <SizeChartSection />

        {/* Measurement Guide */}
        <div className="mt-12 md:mt-16">
          <MeasurementGuideSection />
        </div>

        {/* Size Converter */}
        <div className="mt-12 md:mt-16">
          <ConverterSection />
        </div>

        {/* FAQs */}
        <div className="mt-12 md:mt-16">
          <SizeGuideFAQSection />
        </div>
      </div>
    </div>
  );
}
