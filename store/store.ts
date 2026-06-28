import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../slices/cartSlice';
import favoritesReducer from '../slices/favoritesSlice';
import checkoutReducer from '../slices/checkoutSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
    checkout: checkoutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
