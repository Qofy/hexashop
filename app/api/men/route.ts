import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import menSakko from '@/public/assets/men/men-sakko.png';
import anzug from '@/public/assets/men/anzug.jpg';

const ImageDataSchema = z.custom<object>((data) => {
  return typeof data === 'object' && data !== null && 'src' in data;
}, { message: 'Invalid image data' });

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
  inCart: z.boolean().default(false),
  isFavorite: z.boolean().default(false),
});

type MenProduct = z.infer<typeof MenProductSchema>;

// Convert StaticImageData to serializable format
const serializeImage = (img: any) => ({
  src: img.src,
  height: img.height,
  width: img.width,
  blurDataURL: img.blurDataURL,
});

const menLatestProducts: MenProduct[] = [
  { id: 1, image: serializeImage(menSakko), clothName: "Classic Blazer", price: 4999, starRate: 4.5, inCart: false, isFavorite: false },
  { id: 2, image: serializeImage(anzug), clothName: "Formal Suit", price: 8999, starRate: 4.8, inCart: false, isFavorite: false },
  { id: 3, image: serializeImage(menSakko), clothName: "Business Jacket", price: 3999, starRate: 4.2, inCart: false, isFavorite: false },
  { id: 4, image: serializeImage(anzug), clothName: "Premium Coat", price: 6999, starRate: 4.7, inCart: false, isFavorite: false },
  { id: 5, image: serializeImage(menSakko), clothName: "Casual Blazer", price: 3499, starRate: 4.3, inCart: false, isFavorite: false },
  { id: 6, image: serializeImage(anzug), clothName: "Elegant Dress Jacket", price: 7499, starRate: 4.6, inCart: false, isFavorite: false },
  { id: 7, image: serializeImage(menSakko), clothName: "Smart Cardigan", price: 2999, starRate: 4.1, inCart: false, isFavorite: false },
  { id: 8, image: serializeImage(anzug), clothName: "Winter Coat", price: 9999, starRate: 4.9, inCart: false, isFavorite: false },
  { id: 9, image: serializeImage(menSakko), clothName: "Summer Jacket", price: 2499, starRate: 4.0, inCart: false, isFavorite: false },
  { id: 10, image: serializeImage(anzug), clothName: "Fashion Blazer", price: 5499, starRate: 4.4, inCart: false, isFavorite: false },
];

const menFeaturedProducts: MenProduct[] = [
  { id: 11, image: serializeImage(anzug), clothName: "Designer Suit", price: 12999, starRate: 4.9, inCart: false, isFavorite: false },
  { id: 12, image: serializeImage(menSakko), clothName: "Executive Blazer", price: 5999, starRate: 4.6, inCart: false, isFavorite: false },
  { id: 13, image: serializeImage(anzug), clothName: "Luxury Coat", price: 14999, starRate: 5.0, inCart: false, isFavorite: false },
  { id: 14, image: serializeImage(menSakko), clothName: "Premium Jacket", price: 6499, starRate: 4.7, inCart: false, isFavorite: false },
  { id: 15, image: serializeImage(anzug), clothName: "Royal Suit", price: 13499, starRate: 4.8, inCart: false, isFavorite: false },
  { id: 16, image: serializeImage(menSakko), clothName: "Elite Blazer", price: 7999, starRate: 4.5, inCart: false, isFavorite: false },
  { id: 17, image: serializeImage(anzug), clothName: "Grand Coat", price: 11999, starRate: 4.9, inCart: false, isFavorite: false },
  { id: 18, image: serializeImage(menSakko), clothName: "Signature Jacket", price: 8499, starRate: 4.6, inCart: false, isFavorite: false },
  { id: 19, image: serializeImage(anzug), clothName: "Heritage Suit", price: 15999, starRate: 5.0, inCart: false, isFavorite: false },
  { id: 20, image: serializeImage(menSakko), clothName: "Iconic Blazer", price: 9999, starRate: 4.7, inCart: false, isFavorite: false },
];

const menCasualProducts: MenProduct[] = [
  { id: 21, image: serializeImage(menSakko), clothName: "Casual Button-up", price: 1999, starRate: 4.2, inCart: false, isFavorite: false },
  { id: 22, image: serializeImage(anzug), clothName: "Relaxed Fit Shirt", price: 1799, starRate: 4.1, inCart: false, isFavorite: false },
  { id: 23, image: serializeImage(menSakko), clothName: "Easy Jacket", price: 2799, starRate: 4.3, inCart: false, isFavorite: false },
  { id: 24, image: serializeImage(anzug), clothName: "Comfortable Sweater", price: 2499, starRate: 4.0, inCart: false, isFavorite: false },
  { id: 25, image: serializeImage(menSakko), clothName: "Laid-back Blazer", price: 3299, starRate: 4.4, inCart: false, isFavorite: false },
  { id: 26, image: serializeImage(anzug), clothName: "Chill Hoodie Jacket", price: 2199, starRate: 4.2, inCart: false, isFavorite: false },
  { id: 27, image: serializeImage(menSakko), clothName: "Everyday Shirt", price: 1599, starRate: 3.9, inCart: false, isFavorite: false },
  { id: 28, image: serializeImage(anzug), clothName: "Weekend Jacket", price: 3099, starRate: 4.3, inCart: false, isFavorite: false },
  { id: 29, image: serializeImage(menSakko), clothName: "Simple Cardigan", price: 2699, starRate: 4.1, inCart: false, isFavorite: false },
  { id: 30, image: serializeImage(anzug), clothName: "Casual Sweater", price: 2399, starRate: 4.2, inCart: false, isFavorite: false },
];

const menTrendingProducts: MenProduct[] = [
  { id: 31, image: serializeImage(anzug), clothName: "Trendy Blazer", price: 4499, starRate: 4.6, inCart: false, isFavorite: false },
  { id: 32, image: serializeImage(menSakko), clothName: "Modern Jacket", price: 3999, starRate: 4.5, inCart: false, isFavorite: false },
  { id: 33, image: serializeImage(anzug), clothName: "Stylish Coat", price: 5999, starRate: 4.7, inCart: false, isFavorite: false },
  { id: 34, image: serializeImage(menSakko), clothName: "Fashion Forward", price: 4299, starRate: 4.4, inCart: false, isFavorite: false },
  { id: 35, image: serializeImage(anzug), clothName: "Contemporary Suit", price: 9499, starRate: 4.8, inCart: false, isFavorite: false },
  { id: 36, image: serializeImage(menSakko), clothName: "Urban Blazer", price: 4799, starRate: 4.5, inCart: false, isFavorite: false },
  { id: 37, image: serializeImage(anzug), clothName: "Latest Style Coat", price: 6499, starRate: 4.6, inCart: false, isFavorite: false },
  { id: 38, image: serializeImage(menSakko), clothName: "In-Vogue Jacket", price: 4199, starRate: 4.4, inCart: false, isFavorite: false },
  { id: 39, image: serializeImage(anzug), clothName: "Hot Trend Suit", price: 8999, starRate: 4.7, inCart: false, isFavorite: false },
  { id: 40, image: serializeImage(menSakko), clothName: "Next Big Thing", price: 5299, starRate: 4.5, inCart: false, isFavorite: false },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let products: MenProduct[] = [];

    switch (category) {
      case 'latest':
        products = menLatestProducts;
        break;
      case 'featured':
        products = menFeaturedProducts;
        break;
      case 'casual':
        products = menCasualProducts;
        break;
      case 'trending':
        products = menTrendingProducts;
        break;
      default:
        products = [
          ...menLatestProducts,
          ...menFeaturedProducts,
          ...menCasualProducts,
          ...menTrendingProducts,
        ];
    }

    const validatedProducts = products.map(p => MenProductSchema.parse(p));

    return NextResponse.json({
      success: true,
      data: validatedProducts,
      count: validatedProducts.length,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch products',
      },
      { status: 500 }
    );
  }
}
