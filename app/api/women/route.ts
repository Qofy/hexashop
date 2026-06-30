import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Latest imports
import l1 from '@/public/assets/women/latest/l1.png';
import l2 from '@/public/assets/women/latest/l2.png';
import l3 from '@/public/assets/women/latest/l3.png';
import l4 from '@/public/assets/women/latest/l4.png';
import l5 from '@/public/assets/women/latest/l5.png';
import l6 from '@/public/assets/women/latest/l6.png';
import l7 from '@/public/assets/women/latest/l7.png';
import l8 from '@/public/assets/women/latest/l8.png';
import l9 from '@/public/assets/women/latest/l9.png';
import l10 from '@/public/assets/women/latest/l10.png';

// Featured imports
import f1 from '@/public/assets/women/featured/f1.png';
import f2 from '@/public/assets/women/featured/f2.png';
import f3 from '@/public/assets/women/featured/f3.png';
import f4 from '@/public/assets/women/featured/f4.png';
import f5 from '@/public/assets/women/featured/f5.png';
import f6 from '@/public/assets/women/featured/f6.png';
import f7 from '@/public/assets/women/featured/f7.png';
import f8 from '@/public/assets/women/featured/f8.png';
import f9 from '@/public/assets/women/featured/f9.png';

// Casual imports
import casual1 from '@/public/assets/women/casual/casual1.jpg';
import casual2 from '@/public/assets/women/casual/casual2.png';
import casual3 from '@/public/assets/women/casual/casual3.png';
import casual4 from '@/public/assets/women/casual/casual4.jpg';
import casual5 from '@/public/assets/women/casual/casual5.png';
import casual6 from '@/public/assets/women/casual/casual6.png';
import casual7 from '@/public/assets/women/casual/casual7.jpg';
import casual8 from '@/public/assets/women/casual/casual8.png';
import casual9 from '@/public/assets/women/casual/casual9.png';
import casual10 from '@/public/assets/women/casual/casual10.png';
import f10 from '@/public/assets/women/casual/f10.jpg';

// Trending imports
import tr1 from '@/public/assets/women/trending/tr1.png';
import tr2 from '@/public/assets/women/trending/tr2.png';
import tr3 from '@/public/assets/women/trending/tr3.png';
import tr4 from '@/public/assets/women/trending/tr4.png';
import tr5 from '@/public/assets/women/trending/tr5.png';
import tr6 from '@/public/assets/women/trending/tr6.png';
import tr7 from '@/public/assets/women/trending/tr7.png';
import tr8 from '@/public/assets/women/trending/tr8.png';
import tr9 from '@/public/assets/women/trending/tr9.png';
import tr10 from '@/public/assets/women/trending/tr10.png';

const ImageDataSchema = z.custom<object>((data) => {
  return typeof data === 'object' && data !== null && 'src' in data;
}, { message: 'Invalid image data' });

const WomenProductSchema = z.object({
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

type WomenProduct = z.infer<typeof WomenProductSchema>;

const serializeImage = (img: any) => ({
  src: img.src,
  height: img.height,
  width: img.width,
  blurDataURL: img.blurDataURL,
});

const womenLatestProducts: WomenProduct[] = [
  { id: 1, image: serializeImage(l1), clothName: "Classic Blouse", price: 45.99, starRate: 4.5, inCart: false, isFavorite: false },
  { id: 2, image: serializeImage(l2), clothName: "Elegant Dress", price: 79.99, starRate: 4.8, inCart: false, isFavorite: false },
  { id: 3, image: serializeImage(l3), clothName: "Casual Shirt", price: 35.99, starRate: 4.2, inCart: false, isFavorite: false },
  { id: 4, image: serializeImage(l4), clothName: "Premium Blazer", price: 65.99, starRate: 4.7, inCart: false, isFavorite: false },
  { id: 5, image: serializeImage(l5), clothName: "Summer Top", price: 32.99, starRate: 4.3, inCart: false, isFavorite: false },
  { id: 6, image: serializeImage(l6), clothName: "Stylish Cardigan", price: 55.99, starRate: 4.6, inCart: false, isFavorite: false },
  { id: 7, image: serializeImage(l7), clothName: "Chic Sweater", price: 49.99, starRate: 4.4, inCart: false, isFavorite: false },
  { id: 8, image: serializeImage(l8), clothName: "Designer Dress", price: 89.99, starRate: 4.9, inCart: false, isFavorite: false },
  { id: 9, image: serializeImage(l9), clothName: "Formal Gown", price: 129.99, starRate: 5.0, inCart: false, isFavorite: false },
  { id: 10, image: serializeImage(l10), clothName: "Trendy Jacket", price: 69.99, starRate: 4.5, inCart: false, isFavorite: false },
];

const womenFeaturedProducts: WomenProduct[] = [
  { id: 11, image: serializeImage(f1), clothName: "Luxury Dress", price: 159.99, starRate: 4.9, inCart: false, isFavorite: false },
  { id: 12, image: serializeImage(f2), clothName: "Premium Blouse", price: 89.99, starRate: 4.7, inCart: false, isFavorite: false },
  { id: 13, image: serializeImage(f3), clothName: "Silk Gown", price: 189.99, starRate: 5.0, inCart: false, isFavorite: false },
  { id: 14, image: serializeImage(f4), clothName: "Elegant Blazer", price: 109.99, starRate: 4.8, inCart: false, isFavorite: false },
  { id: 15, image: serializeImage(f5), clothName: "Designer Top", price: 79.99, starRate: 4.6, inCart: false, isFavorite: false },
  { id: 16, image: serializeImage(f6), clothName: "Chic Cardigan", price: 99.99, starRate: 4.7, inCart: false, isFavorite: false },
  { id: 17, image: serializeImage(f7), clothName: "Premium Coat", price: 149.99, starRate: 4.9, inCart: false, isFavorite: false },
  { id: 18, image: serializeImage(f8), clothName: "Formal Dress", price: 119.99, starRate: 4.8, inCart: false, isFavorite: false },
  { id: 19, image: serializeImage(f9), clothName: "Luxury Sweater", price: 139.99, starRate: 4.9, inCart: false, isFavorite: false },
];

const womenCasualProducts: WomenProduct[] = [
  { id: 20, image: serializeImage(casual1), clothName: "Casual Tee", price: 24.99, starRate: 4.2, inCart: false, isFavorite: false },
  { id: 21, image: serializeImage(casual2), clothName: "Relaxed Shirt", price: 34.99, starRate: 4.3, inCart: false, isFavorite: false },
  { id: 22, image: serializeImage(casual3), clothName: "Comfy Hoodie", price: 44.99, starRate: 4.4, inCart: false, isFavorite: false },
  { id: 23, image: serializeImage(casual4), clothName: "Casual Jacket", price: 54.99, starRate: 4.5, inCart: false, isFavorite: false },
  { id: 24, image: serializeImage(casual5), clothName: "Easy Tank", price: 19.99, starRate: 4.1, inCart: false, isFavorite: false },
  { id: 25, image: serializeImage(casual6), clothName: "Laid Back Shirt", price: 39.99, starRate: 4.3, inCart: false, isFavorite: false },
  { id: 26, image: serializeImage(casual7), clothName: "Weekend Wear", price: 49.99, starRate: 4.4, inCart: false, isFavorite: false },
  { id: 27, image: serializeImage(casual8), clothName: "Everyday Top", price: 29.99, starRate: 4.2, inCart: false, isFavorite: false },
  { id: 28, image: serializeImage(casual9), clothName: "Casual Cardigan", price: 44.99, starRate: 4.3, inCart: false, isFavorite: false },
  { id: 29, image: serializeImage(casual10), clothName: "Chill Sweatshirt", price: 39.99, starRate: 4.2, inCart: false, isFavorite: false },
  { id: 30, image: serializeImage(f10), clothName: "Casual Blouse", price: 34.99, starRate: 4.1, inCart: false, isFavorite: false },
];

const womenTrendingProducts: WomenProduct[] = [
  { id: 31, image: serializeImage(tr1), clothName: "Trendy Blouse", price: 59.99, starRate: 4.6, inCart: false, isFavorite: false },
  { id: 32, image: serializeImage(tr2), clothName: "Modern Dress", price: 79.99, starRate: 4.7, inCart: false, isFavorite: false },
  { id: 33, image: serializeImage(tr3), clothName: "Stylish Coat", price: 109.99, starRate: 4.8, inCart: false, isFavorite: false },
  { id: 34, image: serializeImage(tr4), clothName: "Fashion Forward", price: 64.99, starRate: 4.5, inCart: false, isFavorite: false },
  { id: 35, image: serializeImage(tr5), clothName: "Contemporary Dress", price: 89.99, starRate: 4.7, inCart: false, isFavorite: false },
  { id: 36, image: serializeImage(tr6), clothName: "Urban Style", price: 69.99, starRate: 4.6, inCart: false, isFavorite: false },
  { id: 37, image: serializeImage(tr7), clothName: "Latest Trend Coat", price: 119.99, starRate: 4.8, inCart: false, isFavorite: false },
  { id: 38, image: serializeImage(tr8), clothName: "Trendy Jacket", price: 74.99, starRate: 4.6, inCart: false, isFavorite: false },
  { id: 39, image: serializeImage(tr9), clothName: "Hot Trend Dress", price: 84.99, starRate: 4.7, inCart: false, isFavorite: false },
  { id: 40, image: serializeImage(tr10), clothName: "Next Big Thing", price: 99.99, starRate: 4.8, inCart: false, isFavorite: false },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;

    let products: WomenProduct[] = [];

    switch (category) {
      case 'latest':
        products = womenLatestProducts;
        break;
      case 'featured':
        products = womenFeaturedProducts;
        break;
      case 'casual':
        products = womenCasualProducts;
        break;
      case 'trending':
        products = womenTrendingProducts;
        break;
      default:
        products = [
          ...womenLatestProducts,
          ...womenFeaturedProducts,
          ...womenCasualProducts,
          ...womenTrendingProducts,
        ];
    }

    if (limit) {
      products = products.slice(0, limit);
    }

    const validatedProducts = products.map(p => WomenProductSchema.parse(p));

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
