'use client';

import { MenProduct } from '@/data/mendata/mendata';
import ProductCard from '../ProductCard';

type Props = {
  favorites: MenProduct[];
};

export default function FavoritesList({ favorites }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      {favorites.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
