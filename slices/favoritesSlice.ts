import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MenProduct } from '@/data/mendata/mendata';

interface FavoritesState {
  items: MenProduct[];
  isOpen: boolean;
}

const initialState: FavoritesState = {
  items: [],
  isOpen: false,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<MenProduct>) => {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    openFavorites: (state) => {
      state.isOpen = true;
    },
    closeFavorites: (state) => {
      state.isOpen = false;
    },
    clearFavorites: (state) => {
      state.items = [];
    },
  },
});

export const { addToFavorites, removeFromFavorites, openFavorites, closeFavorites, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
