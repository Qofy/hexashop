import { HelpCircle } from 'lucide-react';

export default function SupportHeader() {
  return (
    <div className="py-6 md:py-12 px-4 md:px-6 bg-gradient-to-r from-blue-50 to-blue-100 text-center">
      <div className="flex justify-center mb-4">
        <HelpCircle size={48} className="text-blue-600" />
      </div>
      <h1 className="text-2xl md:text-4xl font-bold text-gray-900">Support Center</h1>
      <p className="text-sm md:text-base text-gray-600 mt-2">
        Find answers to common questions or contact our support team
      </p>
    </div>
  );
}
