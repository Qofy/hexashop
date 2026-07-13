'use client';

import { useAppSelector } from '@/store/hooks';
import type { RootState } from '@/store/store';
import MyFavoritesHeader from './MyFavoritesHeader';
import FavoritesList from './FavoritesList';
import FavoritesEmpty from './FavoritesEmpty';
import FavoritesSort from './FavoritesSort';
import { useState } from 'react';

type SortOption = 'newest' | 'oldest' | 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';

export default function MyFavoritesClient() {
  const favorites = useAppSelector((state: RootState) => state.favorites.items);
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const sortedFavorites = [...favorites].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return (a.id ?? 0) - (b.id ?? 0);
      case 'name-asc':
        return a.clothName.localeCompare(b.clothName);
      case 'name-desc':
        return b.clothName.localeCompare(a.clothName);
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'newest':
      default:
        return (b.id ?? 0) - (a.id ?? 0);
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-16 md:pt-20">
      <MyFavoritesHeader count={favorites.length} />

      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-12">
        {favorites.length > 0 ? (
          <>
            <FavoritesSort sortBy={sortBy} setSortBy={setSortBy} />
            <FavoritesList favorites={sortedFavorites} />
          </>
        ) : (
          <FavoritesEmpty />
        )}
      </div>
    </div>
  );
}
