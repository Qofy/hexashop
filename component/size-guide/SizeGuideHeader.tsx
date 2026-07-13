import { Ruler } from 'lucide-react';

export default function SizeGuideHeader() {
  return (
    <div className="py-6 md:py-12 px-4 md:px-6 bg-gradient-to-r from-purple-50 to-purple-100 text-center">
      <div className="flex justify-center mb-4">
        <Ruler size={48} className="text-purple-600" />
      </div>
      <h1 className="text-2xl md:text-4xl font-bold text-gray-900">Size Guide</h1>
      <p className="text-sm md:text-base text-gray-600 mt-2">
        Find your perfect fit with our comprehensive size charts and measurement guide
      </p>
    </div>
  );
}
