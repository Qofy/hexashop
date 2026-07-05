import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  paymentMethod: 'credit-card' | 'debit-card' | 'upi' | 'cod';
}

interface Order {
  id: string;
  trackingNumber: string;
  date: string;
  total: number;
  items: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
}

interface CheckoutState {
  isOpen: boolean;
  formData: Partial<CheckoutForm>;
  orders: Order[];
  loading: boolean;
  error: string | null;
  success: boolean;
  orderTotal: number;
  showCongratulations: boolean;
  orderId: string;
  trackingNumber: string;
  orderItemCount: number;
}

const initialState: CheckoutState = {
  isOpen: false,
  formData: {},
  orders: [],
  loading: false,
  error: null,
  success: false,
  orderTotal: 0,
  showCongratulations: false,
  orderId: '',
  trackingNumber: '',
  orderItemCount: 0,
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    openCheckout: (state) => {
      state.isOpen = true;
      state.success = false;
    },
    closeCheckout: (state) => {
      state.isOpen = false;
    },
    updateFormData: (state, action: PayloadAction<Partial<CheckoutForm>>) => {
      state.formData = { ...state.formData, ...action.payload };
      state.error = null;
    },
    resetFormData: (state) => {
      state.formData = {};
      state.error = null;
      state.success = false;
      state.showCongratulations = false;
    },
    placeOrder: (state, action: PayloadAction<{ total: number; itemCount: number }>) => {
      state.loading = true;
      state.error = null;
      state.orderItemCount = action.payload.itemCount;
    },
    orderSuccess: (state, action: PayloadAction<number>) => {
      state.loading = false;
      state.success = true;
      state.orderTotal = action.payload;
      state.orderId = `HEX-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
      state.trackingNumber = `TRACK${Math.random().toString(36).slice(2, 14).toUpperCase()}`;
      state.formData = {};
      const order: Order = {
        id: state.orderId,
        trackingNumber: state.trackingNumber,
        date: new Date().toLocaleDateString(),
        total: action.payload,
        items: state.orderItemCount,
        status: 'processing',
      };
      state.orders.push(order);

      if (typeof window !== 'undefined') {
        const existingOrders = JSON.parse(localStorage.getItem('hexashop_orders') || '[]');
        existingOrders.push(order);
        localStorage.setItem('hexashop_orders', JSON.stringify(existingOrders));
      }
    },
    orderError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    showCongratulations: (state) => {
      state.showCongratulations = true;
    },
    hideCongratulations: (state) => {
      state.showCongratulations = false;
    },
  },
});

export const {
  openCheckout,
  closeCheckout,
  updateFormData,
  resetFormData,
  placeOrder,
  orderSuccess,
  orderError,
  showCongratulations,
  hideCongratulations,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
