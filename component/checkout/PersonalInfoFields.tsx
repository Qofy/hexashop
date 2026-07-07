import { Field, ErrorMessage } from 'formik';

type Props = {
  checkoutContent: any;
};

export default function PersonalInfoFields({ checkoutContent }: Props) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{checkoutContent?.form.personalInfo}</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Field
            type="text"
            name="firstName"
            placeholder={checkoutContent?.form.firstNamePlaceholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <ErrorMessage name="firstName" component="p" className="text-red-500 text-sm mt-1" />
        </div>
        <div>
          <Field
            type="text"
            name="lastName"
            placeholder={checkoutContent?.form.lastNamePlaceholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <ErrorMessage name="lastName" component="p" className="text-red-500 text-sm mt-1" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <Field
            type="email"
            name="email"
            placeholder={checkoutContent?.form.emailPlaceholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
        </div>
        <div>
          <Field
            type="tel"
            name="phone"
            placeholder={checkoutContent?.form.phonePlaceholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <ErrorMessage name="phone" component="p" className="text-red-500 text-sm mt-1" />
        </div>
      </div>
    </div>
  );
}
