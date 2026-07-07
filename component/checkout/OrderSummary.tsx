type Props = {
  checkoutContent: any;
  total: number;
};

export default function OrderSummary({ checkoutContent, total }: Props) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-600">{checkoutContent?.form.subtotalLabel}</span>
        <span className="font-semibold">${total.toLocaleString()}</span>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-600">{checkoutContent?.form.shippingLabel}</span>
        <span className="font-semibold">{checkoutContent?.form.freeShipping}</span>
      </div>
      <div className="border-t pt-2 flex justify-between items-center">
        <span className="font-bold text-gray-900">{checkoutContent?.form.totalLabel}</span>
        <span className="font-bold text-xl text-blue-600">${total.toLocaleString()}</span>
      </div>
    </div>
  );
}
