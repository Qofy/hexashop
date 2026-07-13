type Props = {
  count: number;
};

export default function MyFavoritesHeader({ count }: Props) {
  return (
    <div className="py-6 md:py-12 px-4 md:px-6 text-center">
      <h1 className="text-2xl md:text-4xl font-bold text-gray-900">My Favorites</h1>
      <p className="text-sm md:text-base text-gray-600 mt-2">
        {count === 0 ? 'No favorites yet' : `You have ${count} favorite item${count !== 1 ? 's' : ''}`}
      </p>
    </div>
  );
}
