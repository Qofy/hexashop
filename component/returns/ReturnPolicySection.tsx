import { Check, AlertCircle } from 'lucide-react';

export default function ReturnPolicySection() {
  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8">Our Return Policy</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* What Can Be Returned */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <Check size={24} className="text-green-600 flex-shrink-0" />
            <h3 className="text-lg md:text-xl font-bold text-gray-900">What Can Be Returned</h3>
          </div>
          <ul className="space-y-2 md:space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold mt-1">✓</span>
              <span className="text-sm md:text-base text-gray-700">Unworn items with tags attached</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold mt-1">✓</span>
              <span className="text-sm md:text-base text-gray-700">Items returned within 30 days of purchase</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold mt-1">✓</span>
              <span className="text-sm md:text-base text-gray-700">Original packaging intact</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold mt-1">✓</span>
              <span className="text-sm md:text-base text-gray-700">All accessories included</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold mt-1">✓</span>
              <span className="text-sm md:text-base text-gray-700">Valid proof of purchase</span>
            </li>
          </ul>
        </div>

        {/* What Cannot Be Returned */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle size={24} className="text-red-600 flex-shrink-0" />
            <h3 className="text-lg md:text-xl font-bold text-gray-900">What Cannot Be Returned</h3>
          </div>
          <ul className="space-y-2 md:space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-red-600 font-bold mt-1">✗</span>
              <span className="text-sm md:text-base text-gray-700">Worn or damaged items</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-600 font-bold mt-1">✗</span>
              <span className="text-sm md:text-base text-gray-700">Items with missing tags</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-600 font-bold mt-1">✗</span>
              <span className="text-sm md:text-base text-gray-700">Items returned after 30 days</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-600 font-bold mt-1">✗</span>
              <span className="text-sm md:text-base text-gray-700">Clearance or final sale items</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-600 font-bold mt-1">✗</span>
              <span className="text-sm md:text-base text-gray-700">Items without original packaging</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Return Timeline */}
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mt-6 md:mt-8">
        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">Return Timeline</h3>
        <div className="space-y-3 md:space-y-4">
          <div className="flex gap-4">
            <div className="bg-green-100 text-green-700 rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0 text-sm md:text-base">1</div>
            <div>
              <p className="font-semibold text-sm md:text-base text-gray-900">Initiate Return</p>
              <p className="text-xs md:text-sm text-gray-600">Go to your orders and request a return</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="bg-green-100 text-green-700 rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0 text-sm md:text-base">2</div>
            <div>
              <p className="font-semibold text-sm md:text-base text-gray-900">Get Shipping Label</p>
              <p className="text-xs md:text-sm text-gray-600">We'll email you a prepaid return shipping label</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="bg-green-100 text-green-700 rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0 text-sm md:text-base">3</div>
            <div>
              <p className="font-semibold text-sm md:text-base text-gray-900">Ship Back</p>
              <p className="text-xs md:text-sm text-gray-600">Pack and ship the item using the provided label</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="bg-green-100 text-green-700 rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0 text-sm md:text-base">4</div>
            <div>
              <p className="font-semibold text-sm md:text-base text-gray-900">Receive Refund</p>
              <p className="text-xs md:text-sm text-gray-600">After we inspect, refund issued within 5-7 business days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
