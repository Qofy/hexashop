import ProductCard from '../ProductCard';

type Product = {
  id: number;
  image: { src: string; height: number; width: number; blurDataURL?: string };
  clothName: string;
  price: number;
  starRate: number;
  inCart: boolean;
  isFavorite: boolean;
};

type Props = {
  products: Product[];
};

export default function SimilarProducts({ products }: Props) {
  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Similar Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map(prod => (
            <div key={prod.id} className="cursor-pointer">
              <ProductCard product={prod} />
            </div>
          ))
        ) : (
          <p className="text-gray-600">No similar products found</p>
        )}
      </div>
    </div>
  );
}
