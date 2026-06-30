import { useQuery } from 'react-query';
import axios from 'axios';

interface Product {
  id: number;
  image: {
    src: string;
    height: number;
    width: number;
    blurDataURL?: string;
  };
  clothName: string;
  price: number;
  starRate: number;
  inCart: boolean;
  isFavorite: boolean;
}

export const useWomenProducts = (
  category: 'latest' | 'featured' | 'casual' | 'trending' = 'latest',
  limit?: number
) => {
  return useQuery<Product[]>({
    queryKey: ['womenProducts', category, limit],
    queryFn: async () => {
      const { data } = await axios.get('/api/women', {
        params: {
          category,
          ...(limit && { limit }),
        },
      });
      return data.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
