'use client';

import { useState } from 'react';
import { ArrowRightLeft } from 'lucide-react';

const sizeConversions = {
  men: [
    { us: 'XS', eu: '34', uk: '34', japan: 'S' },
    { us: 'S', eu: '36', uk: '36', japan: 'M' },
    { us: 'M', eu: '38', uk: '38', japan: 'L' },
    { us: 'L', eu: '40', uk: '40', japan: 'LL' },
    { us: 'XL', eu: '42', uk: '42', japan: '3L' },
    { us: '2XL', eu: '44', uk: '44', japan: '4L' },
  ],
  women: [
    { us: 'XS', eu: '32', uk: '6', japan: '5' },
    { us: 'S', eu: '34', uk: '8', japan: '7' },
    { us: 'M', eu: '36', uk: '10', japan: '9' },
    { us: 'L', eu: '38', uk: '12', japan: '11' },
    { us: 'XL', eu: '40', uk: '14', japan: '13' },
    { us: '2XL', eu: '42', uk: '16', japan: '15' },
  ],
};

export default function ConverterSection() {
  const [category, setCategory] = useState<'men' | 'women'>('men');
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const conversions = sizeConversions[category];
  const selected = selectedSize ? conversions.find(c => c.us === selectedSize) : null;

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8 flex items-center gap-3">
        <ArrowRightLeft size={28} className="text-purple-600" />
        Size Converter
      </h2>

      {/* Category Selector */}
      <div className="mb-6 md:mb-8 flex gap-4">
        {(['men', 'women'] as const).map(cat => (
          <button
            key={cat}
            onClick={() => {
              setCategory(cat);
              setSelectedSize(null);
            }}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium text-sm md:text-base transition-colors capitalize ${
              category === cat
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Converter Interface */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Size Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">Select Your Size</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3">
            {conversions.map(conv => (
              <button
                key={conv.us}
                onClick={() => setSelectedSize(conv.us)}
                className={`px-3 md:px-4 py-2 md:py-3 rounded-lg font-semibold text-sm md:text-base transition-colors ${
                  selectedSize === conv.us
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {conv.us}
              </button>
            ))}
          </div>
        </div>

        {/* Conversion Results */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-md p-6 md:p-8">
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">Equivalent Sizes</h3>
          {selected ? (
            <div className="space-y-3 md:space-y-4">
              <div className="bg-white rounded-lg p-4 md:p-5">
                <p className="text-xs md:text-sm text-gray-600 mb-1">US Size</p>
                <p className="text-2xl md:text-3xl font-bold text-purple-600">{selected.us}</p>
              </div>
              <div className="bg-white rounded-lg p-4 md:p-5">
                <p className="text-xs md:text-sm text-gray-600 mb-1">EU Size</p>
                <p className="text-2xl md:text-3xl font-bold text-purple-600">{selected.eu}</p>
              </div>
              <div className="bg-white rounded-lg p-4 md:p-5">
                <p className="text-xs md:text-sm text-gray-600 mb-1">UK Size</p>
                <p className="text-2xl md:text-3xl font-bold text-purple-600">{selected.uk}</p>
              </div>
              <div className="bg-white rounded-lg p-4 md:p-5">
                <p className="text-xs md:text-sm text-gray-600 mb-1">Japan Size</p>
                <p className="text-2xl md:text-3xl font-bold text-purple-600">{selected.japan}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-48 md:h-56 text-gray-500 text-sm md:text-base">
              Select a size to see conversions
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 md:p-6 mt-6 md:mt-8">
        <p className="text-xs md:text-sm text-blue-800">
          <span className="font-semibold">Note:</span> Size conversions are approximate. Actual sizes may vary slightly by brand and style. Always refer to the product size chart for the most accurate fit.
        </p>
      </div>
    </div>
  );
}
