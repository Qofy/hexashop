import { Field, ErrorMessage } from 'formik';

type Props = {
  checkoutContent: any;
};

export default function AddressFields({ checkoutContent }: Props) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{checkoutContent?.form.shippingAddress}</h3>
      <div className="mb-4">
        <Field
          type="text"
          name="address"
          placeholder={checkoutContent?.form.addressPlaceholder}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <ErrorMessage name="address" component="p" className="text-red-500 text-sm mt-1" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Field
            type="text"
            name="city"
            placeholder={checkoutContent?.form.cityPlaceholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <ErrorMessage name="city" component="p" className="text-red-500 text-sm mt-1" />
        </div>
        <div>
          <Field
            type="text"
            name="state"
            placeholder={checkoutContent?.form.statePlaceholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <ErrorMessage name="state" component="p" className="text-red-500 text-sm mt-1" />
        </div>
        <div>
          <Field
            type="text"
            name="zipCode"
            placeholder={checkoutContent?.form.zipCodePlaceholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <ErrorMessage name="zipCode" component="p" className="text-red-500 text-sm mt-1" />
        </div>
      </div>
    </div>
  );
}
