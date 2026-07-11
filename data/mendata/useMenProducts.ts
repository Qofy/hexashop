'use client';

import { useQuery } from 'react-query';
import axios from 'axios';
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

const axiosInstance = axios.create({
  baseURL: '/',
  timeout: 10000,
});

type CategoryType = 'latest' | 'featured' | 'casual' | 'trending';

async function fetchMenProducts(category?: CategoryType, limit?: number) {
  const { data } = await axiosInstance.get<{
    success: boolean;
    data: unknown[];
    count: number;
    error?: string;
  }>('/api/men', {
    params: category ? { category } : {},
  });

  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch products');
  }

  const products = data.data.map((item: unknown) => MenProductSchema.parse(item));

  return limit ? products.slice(0, limit) : products;
}

export function useMenProducts(category?: CategoryType, limit?:number) {
  return useQuery(
    ['menProducts', category,limit],
    () => fetchMenProducts(category, limit),
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    }
  );
}
