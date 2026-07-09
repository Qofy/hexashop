type Props = {
  orderId: string;
  date: string;
  trackingNumber: string;
  estimatedDelivery: string;
  trackContent: any;
};

export default function TrackingOrderDetails({
  orderId,
  date,
  trackingNumber,
  estimatedDelivery,
  trackContent,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div>
        <p className="text-sm text-gray-600 mb-1">Order ID</p>
        <p className="text-lg font-bold text-gray-900">{orderId}</p>
      </div>
      <div>
        <p className="text-sm text-gray-600 mb-1">{trackContent?.orderDate}</p>
        <p className="text-lg font-bold text-gray-900">{date}</p>
      </div>
      <div>
        <p className="text-sm text-gray-600 mb-1">{trackContent?.estimatedDelivery}</p>
        <p className="text-lg font-bold text-green-600">{estimatedDelivery}</p>
      </div>
      <div>
        <p className="text-sm text-gray-600 mb-1">{trackContent?.trackingNumber}</p>
        <p className="text-lg font-bold text-gray-900">{trackingNumber}</p>
      </div>
    </div>
  );
}
