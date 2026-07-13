import { ArrowUpDown } from 'lucide-react';

type SortOption = 'newest' | 'oldest' | 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';

type Props = {
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
};

export default function FavoritesSort({ sortBy, setSortBy }: Props) {
  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'name-asc', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
    { value: 'price-asc', label: 'Price (Low to High)' },
    { value: 'price-desc', label: 'Price (High to Low)' },
  ];

  return (
    <div className="mb-6 md:mb-8 flex items-center justify-between">
      <h2 className="text-lg md:text-xl font-semibold text-gray-900">Your Favorites</h2>
      <div className="flex items-center gap-2 md:gap-3">
        <ArrowUpDown size={18} className="text-gray-600" />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-xs md:text-sm cursor-pointer"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
