import { Clock, Truck, CheckCircle } from 'lucide-react';

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered';

type Props = {
  status: OrderStatus;
  trackContent: any;
};

const statusSteps: { status: OrderStatus; label: string; icon: React.ReactNode }[] = [
  { status: 'processing', label: 'Processing', icon: <Clock size={20} /> },
  { status: 'shipped', label: 'Shipped', icon: <Truck size={20} /> },
  { status: 'delivered', label: 'Delivered', icon: <CheckCircle size={20} /> },
];

export default function TrackingStatusTimeline({ status, trackContent }: Props) {
  const getStatusIndex = (status: OrderStatus): number => {
    return statusSteps.findIndex(step => step.status === status);
  };

  return (
    <div className="mb-8">
      <p className="text-sm font-semibold text-gray-900 mb-6">
        {trackContent?.orderStatusLabel}
      </p>
      <div className="flex justify-between items-center">
        {statusSteps.map((step, index) => {
          const currentIndex = getStatusIndex(status);
          const isCompleted = index <= currentIndex;
          const isCurrentStep = index === currentIndex;

          return (
            <div key={step.status} className="flex flex-col items-center flex-1">
              <div
                className={`mb-4 p-3 rounded-full ${
                  isCompleted
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {step.icon}
              </div>
              <p
                className={`text-sm font-medium text-center ${
                  isCompleted ? 'text-gray-900' : 'text-gray-500'
                }`}
              >
                {step.label}
              </p>
              {isCurrentStep && (
                <p className="text-xs text-blue-600 font-bold mt-2">CURRENT</p>
              )}
              {index < statusSteps.length - 1 && (
                <div
                  className={`h-1 w-full mt-6 ${
                    isCompleted ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
