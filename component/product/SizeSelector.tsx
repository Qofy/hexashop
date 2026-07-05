'use client';

import { useState } from 'react';

export default function SizeSelector() {
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-900 mb-3">Size</label>
      <div className="flex gap-2">
        {sizes.map(size => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`px-4 py-2 border-2 rounded transition-colors ${
              selectedSize === size
                ? 'border-gray-900 bg-gray-900 text-white'
                : 'border-gray-300 hover:border-gray-900 hover:bg-gray-100'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
