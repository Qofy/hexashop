import ProductRating from './ProductRating';

type Props = {
  name: string;
  price: number;
  rating: number;
};

export default function ProductHeader({ name, price, rating }: Props) {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{name}</h1>
      <ProductRating rating={rating} />

      <div className="mb-6">
        <p className="text-4xl font-bold text-gray-900">${price}</p>
        <p className="text-sm text-green-600 mt-2">✓ In Stock</p>
      </div>

      <p className="text-gray-700 leading-relaxed mb-6">
        Experience premium quality and style with this carefully selected item from our collection.
        This product combines comfort, durability, and contemporary design. Perfect for any occasion,
        it's a versatile addition to your wardrobe.
      </p>
    </div>
  );
}
