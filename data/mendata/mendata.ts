import { z } from "zod";

// Schema for product validation
export const MenProductSchema = z.object({
  id: z.number(),
  image: z.object({
    src: z.string(),
    height: z.number(),
    width: z.number(),
    blurDataURL: z.string().optional(),
  }),
  clothName: z.string(),
  price: z.number(),
  starRate: z.number().min(0).max(5), // Use lucide <Star /> icon, render starRate times
  inCart: z.boolean(), // Use lucide <ShoppingCart /> icon when true
  isFavorite: z.boolean(), // Use lucide <Heart /> icon when true
});

export type MenProduct = z.infer<typeof MenProductSchema>;

export type ProductCategory = 'latest' | 'featured' | 'casual' | 'trending';
