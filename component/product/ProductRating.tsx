import { Star } from 'lucide-react';

type Props = {
  rating: number;
};

export default function ProductRating({ rating }: Props) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="flex items-center gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={20}
            className={
              i < Math.round(rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }
          />
        ))}
      </div>
      <span className="text-lg text-gray-600">({rating} out of 5)</span>
    </div>
  );
}
