'use client';

import { useEffect, useState } from 'react';
import { z } from 'zod';

const MenProductSchema = z.object({
  id: z.number(),
  image: z.object({
    src: z.string(),
    height: z.number(),
    width: z.number(),
    blurDataURL: z.string().optional(),
  }),
  clothName: z.string(),
  price: z.number(),
  starRate: z.number().min(0).max(5),
  inCart: z.boolean(),
  isFavorite: z.boolean(),
});

export type MenProduct = z.infer<typeof MenProductSchema>;

type FetchState = {
  data: MenProduct[];
  loading: boolean;
  error: string | null;
};

export function useMenProducts(category?: 'latest' | 'featured' | 'casual' | 'trending') {
  const [state, setState] = useState<FetchState>({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchProducts() {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));

        const url = new URL('/api/men', window.location.origin);
        if (category) {
          url.searchParams.append('category', category);
        }

        const response = await fetch(url.toString());

        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`);
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.error || 'Failed to fetch products');
        }

        // Validate response data
        const validated = result.data.map((item: any) => MenProductSchema.parse(item));

        setState({
          data: validated,
          loading: false,
          error: null,
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setState({
          data: [],
          loading: false,
          error: errorMessage,
        });
      }
    }

    fetchProducts();
  }, [category]);

  return state;
}
