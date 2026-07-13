import { Package, FileText, Truck, DollarSign } from 'lucide-react';

export default function StepsSection() {
  const steps = [
    {
      icon: FileText,
      title: 'Step 1: Request Return',
      description: 'Log into your account, go to your orders, and click "Return Item". Select the item and reason for return.',
    },
    {
      icon: Package,
      title: 'Step 2: Pack Item',
      description: 'Carefully pack your item in original packaging. Include all accessories and ensure everything is clean.',
    },
    {
      icon: Truck,
      title: 'Step 3: Ship Back',
      description: 'We\'ll email you a prepaid shipping label. Print it and attach to your package. Drop at any shipping location.',
    },
    {
      icon: DollarSign,
      title: 'Step 4: Get Refund',
      description: 'Once we receive and inspect your item, your refund will be processed within 5-7 business days.',
    },
  ];

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8 text-center">How Returns Work</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-green-100 rounded-full mb-4">
                <Icon size={24} className="text-green-600 md:w-7 md:h-7" />
              </div>
              <h3 className="font-bold text-sm md:text-base text-gray-900 mb-2">{step.title}</h3>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
