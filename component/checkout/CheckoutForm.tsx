import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { placeOrder, orderSuccess } from '@/slices/checkoutSlice';
import { clearCart } from '@/slices/cartSlice';
import type { RootState } from '@/store/store';
import PersonalInfoFields from './PersonalInfoFields';
import AddressFields from './AddressFields';
import PaymentMethodFields from './PaymentMethodFields';
import OrderSummary from './OrderSummary';

type Props = {
  checkoutContent: any;
  total: number;
  loading: boolean;
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  zipCode: Yup.string().required('Zip code is required'),
  paymentMethod: Yup.string().required('Payment method is required'),
});

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  paymentMethod: '',
};

export default function CheckoutForm({ checkoutContent, total, loading }: Props) {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state: RootState) => state.cart.items);

  const handleSubmit = () => {
    dispatch(placeOrder({ total, itemCount: cartItems.length }));

    setTimeout(() => {
      dispatch(orderSuccess(total));
      dispatch(clearCart());
    }, 1500);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isValid, dirty }) => (
        <Form className="space-y-6">
          <PersonalInfoFields checkoutContent={checkoutContent} />
          <AddressFields checkoutContent={checkoutContent} />
          <PaymentMethodFields checkoutContent={checkoutContent} />
          <OrderSummary checkoutContent={checkoutContent} total={total} />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !isValid || !dirty}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? checkoutContent?.form.processingButton : checkoutContent?.form.placeOrderButton}
          </button>
        </Form>
      )}
    </Formik>
  );
}
