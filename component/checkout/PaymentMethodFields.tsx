import { Field, ErrorMessage } from 'formik';

type Props = {
  checkoutContent: any;
};

const paymentMethods = [
  { value: 'credit-card', label: 'creditCardLabel' },
  { value: 'debit-card', label: 'debitCardLabel' },
  { value: 'upi', label: 'upiLabel' },
  { value: 'cod', label: 'codLabel' },
];

export default function PaymentMethodFields({ checkoutContent }: Props) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{checkoutContent?.form.paymentMethod}</h3>
      <div className="space-y-3">
        {paymentMethods.map((method) => (
          <label key={method.value} className="flex items-center cursor-pointer">
            <Field
              type="radio"
              name="paymentMethod"
              value={method.value}
              className="w-4 h-4"
            />
            <span className="ml-3 text-gray-700">
              {checkoutContent?.form[method.label]}
            </span>
          </label>
        ))}
      </div>
      <ErrorMessage name="paymentMethod" component="p" className="text-red-500 text-sm mt-2" />
    </div>
  );
}
