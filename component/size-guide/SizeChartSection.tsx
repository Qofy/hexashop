'use client';

import { useState } from 'react';

type Category = 'men' | 'women' | 'kids';

export default function SizeChartSection() {
  const [activeCategory, setActiveCategory] = useState<Category>('men');

  const charts = {
    men: {
      title: "Men's Clothing",
      sizes: [
        { size: 'XS', chest: '34-36', shoulder: '16-17', length: '27-28', waist: '28-30' },
        { size: 'S', chest: '36-38', shoulder: '17-18', length: '28-29', waist: '30-32' },
        { size: 'M', chest: '38-40', shoulder: '18-19', length: '29-30', waist: '32-34' },
        { size: 'L', chest: '40-42', shoulder: '19-20', length: '30-31', waist: '34-36' },
        { size: 'XL', chest: '42-44', shoulder: '20-21', length: '31-32', waist: '36-38' },
        { size: '2XL', chest: '44-46', shoulder: '21-22', length: '32-33', waist: '38-40' },
      ],
      headers: ['Size', 'Chest (in)', 'Shoulder (in)', 'Length (in)', 'Waist (in)'],
    },
    women: {
      title: "Women's Clothing",
      sizes: [
        { size: 'XS', bust: '32-34', waist: '24-26', hips: '34-36', length: '27-28' },
        { size: 'S', bust: '34-36', waist: '26-28', hips: '36-38', length: '28-29' },
        { size: 'M', bust: '36-38', waist: '28-30', hips: '38-40', length: '29-30' },
        { size: 'L', bust: '38-40', waist: '30-32', hips: '40-42', length: '30-31' },
        { size: 'XL', bust: '40-42', waist: '32-34', hips: '42-44', length: '31-32' },
        { size: '2XL', bust: '42-44', waist: '34-36', hips: '44-46', length: '32-33' },
      ],
      headers: ['Size', 'Bust (in)', 'Waist (in)', 'Hips (in)', 'Length (in)'],
    },
    kids: {
      title: "Kids' Clothing",
      sizes: [
        { size: '2T', height: '34-36', chest: '20-21', waist: '19-20' },
        { size: '3T', height: '37-39', chest: '21-22', waist: '20-21' },
        { size: '4T', height: '40-42', chest: '22-23', waist: '21-22' },
        { size: '5T', height: '43-45', chest: '23-24', waist: '22-23' },
        { size: 'XS (6)', height: '46-48', chest: '24-25', waist: '23-24' },
        { size: 'S (8)', height: '50-52', chest: '26-27', waist: '25-26' },
      ],
      headers: ['Size', 'Height (in)', 'Chest (in)', 'Waist (in)'],
    },
  };

  const currentChart = charts[activeCategory];

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8">Size Charts</h2>

      {/* Category Tabs */}
      <div className="flex gap-2 md:gap-4 mb-6 md:mb-8 border-b border-gray-200">
        {(['men', 'women', 'kids'] as const).map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 md:px-6 py-3 md:py-4 font-medium text-sm md:text-base transition-colors border-b-2 capitalize ${
              activeCategory === category
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Size Chart Table */}
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6 overflow-x-auto">
        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">{currentChart.title}</h3>
        <table className="w-full text-xs md:text-sm">
          <thead>
            <tr className="border-b-2 border-gray-300 bg-gray-50">
              {currentChart.headers.map(header => (
                <th key={header} className="px-2 md:px-4 py-3 text-left font-bold text-gray-900">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentChart.sizes.map((row, idx) => (
              <tr key={idx} className={`border-b border-gray-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <td className="px-2 md:px-4 py-3 font-semibold text-gray-900">{row.size}</td>
                {Object.entries(row).map(([key, value]) => {
                  if (key === 'size') return null;
                  return (
                    <td key={key} className="px-2 md:px-4 py-3 text-gray-700">
                      {value}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 md:p-6 mt-6 md:mt-8">
        <p className="text-xs md:text-sm text-blue-800">
          <span className="font-semibold">Note:</span> All measurements are in inches. For the most accurate fit, please measure yourself wearing minimal clothing. If you're between sizes, we recommend sizing up for comfort.
        </p>
      </div>
    </div>
  );
}
