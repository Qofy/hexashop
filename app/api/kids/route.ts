import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Latest imports
import l1 from '@/public/assets/kids/latest/l1.png';
import l2 from '@/public/assets/kids/latest/l2.png';
import l3 from '@/public/assets/kids/latest/l3.png';
import l4 from '@/public/assets/kids/latest/l4.png';
import l5 from '@/public/assets/kids/latest/l5.png';
import l6 from '@/public/assets/kids/latest/l6.png';
import l7 from '@/public/assets/kids/latest/l7.png';
import l8 from '@/public/assets/kids/latest/l8.png';
import l9 from '@/public/assets/kids/latest/l9.png';
import l10 from '@/public/assets/kids/latest/l10.png';

// Featured imports
import f1 from '@/public/assets/kids/featured/f1.png';
import f2 from '@/public/assets/kids/featured/f2.png';
import f3 from '@/public/assets/kids/featured/f3.png';
import f4 from '@/public/assets/kids/featured/f4.png';
import f5 from '@/public/assets/kids/featured/f5.png';
import f6 from '@/public/assets/kids/featured/f6.png';
import f7 from '@/public/assets/kids/featured/f7.png';
import f8 from '@/public/assets/kids/featured/f8.png';
import f9 from '@/public/assets/kids/featured/f9.png';
import f10 from '@/public/assets/kids/featured/f10.jpg';

// Casual imports
import casual1 from '@/public/assets/kids/casual/casual1.png';
import casual2 from '@/public/assets/kids/casual/casual2.jpg';
import casual3 from '@/public/assets/kids/casual/casual3.png';
import casual4 from '@/public/assets/kids/casual/casual4.png';
import casual5 from '@/public/assets/kids/casual/casual5.png';
import casual6 from '@/public/assets/kids/casual/casual6.png';
import casual7 from '@/public/assets/kids/casual/casual7.png';
import casual8 from '@/public/assets/kids/casual/casual8.png';
import casual9 from '@/public/assets/kids/casual/casual9.png';
import casual10 from '@/public/assets/kids/casual/casual10.png';

// Trending imports
import tr1 from '@/public/assets/kids/trending/tr1.png';
import tr2 from '@/public/assets/kids/trending/tr2.png';
import tr3 from '@/public/assets/kids/trending/tr3.png';
import tr5 from '@/public/assets/kids/trending/tr5.png';
import tr6 from '@/public/assets/kids/trending/tr6.png';
import tr7 from '@/public/assets/kids/trending/tr7.png';
import tr8 from '@/public/assets/kids/trending/tr8.png';
import tr9 from '@/public/assets/kids/trending/tr9.png';
import tr10 from '@/public/assets/kids/trending/tr10.png';

const ImageDataSchema = z.custom<object>((data) => {
  return typeof data === 'object' && data !== null && 'src' in data;
}, { message: 'Invalid image data' });

const KidsProductSchema = z.object({
  id: z.number(),
  image: z.object({
    src: z.string(),
    height: z.number(),
    width: z.number(),
    blurDataURL: z.string().optional(),
  }).passthrough(),
  clothName: z.string(),
  price: z.number(),
  starRate: z.number().min(0).max(5),
  inCart: z.boolean().default(false),
  isFavorite: z.boolean().default(false),
}).passthrough();

type KidsProduct = z.infer<typeof KidsProductSchema>;

const serializeImage = (img: any) => ({
  src: img.src,
  height: img.height,
  width: img.width,
  blurDataURL: img.blurDataURL,
});

const kidsLatestProducts: KidsProduct[] = [
  { id: 81, image: serializeImage(l1), clothName: "Kids T-Shirt", price: 19.99, starRate: 4.4, inCart: false, isFavorite: false },
  { id: 82, image: serializeImage(l2), clothName: "Kids Hoodie", price: 39.99, starRate: 4.6, inCart: false, isFavorite: false },
  { id: 83, image: serializeImage(l3), clothName: "Kids Shorts", price: 24.99, starRate: 4.2, inCart: false, isFavorite: false },
  { id: 84, image: serializeImage(l4), clothName: "Kids Jacket", price: 49.99, starRate: 4.7, inCart: false, isFavorite: false },
  { id: 85, image: serializeImage(l5), clothName: "Kids Sweater", price: 34.99, starRate: 4.3, inCart: false, isFavorite: false },
  { id: 86, image: serializeImage(l6), clothName: "Kids Dress", price: 44.99, starRate: 4.5, inCart: false, isFavorite: false },
  { id: 87, image: serializeImage(l7), clothName: "Kids Pants", price: 29.99, starRate: 4.2, inCart: false, isFavorite: false },
  { id: 88, image: serializeImage(l8), clothName: "Kids Shirt", price: 22.99, starRate: 4.3, inCart: false, isFavorite: false },
  { id: 89, image: serializeImage(l9), clothName: "Kids Vest", price: 32.99, starRate: 4.4, inCart: false, isFavorite: false },
  { id: 90, image: serializeImage(l10), clothName: "Kids Cardigan", price: 39.99, starRate: 4.5, inCart: false, isFavorite: false },
];

const kidsFeaturedProducts: KidsProduct[] = [
  { id: 91, image: serializeImage(f1), clothName: "Premium Kids Hoodie", price: 69.99, starRate: 4.8, inCart: false, isFavorite: false },
  { id: 92, image: serializeImage(f2), clothName: "Deluxe Kids Jacket", price: 89.99, starRate: 4.9, inCart: false, isFavorite: false },
  { id: 93, image: serializeImage(f3), clothName: "Special Kids Dress", price: 79.99, starRate: 4.8, inCart: false, isFavorite: false },
  { id: 94, image: serializeImage(f4), clothName: "Kids Blazer", price: 84.99, starRate: 4.7, inCart: false, isFavorite: false },
  { id: 95, image: serializeImage(f5), clothName: "Kids Coat", price: 99.99, starRate: 4.9, inCart: false, isFavorite: false },
  { id: 96, image: serializeImage(f6), clothName: "Kids Sweater Set", price: 74.99, starRate: 4.6, inCart: false, isFavorite: false },
  { id: 97, image: serializeImage(f7), clothName: "Kids Party Wear", price: 94.99, starRate: 4.8, inCart: false, isFavorite: false },
  { id: 98, image: serializeImage(f8), clothName: "Kids Formal Shirt", price: 59.99, starRate: 4.5, inCart: false, isFavorite: false },
  { id: 99, image: serializeImage(f9), clothName: "Kids Ensemble", price: 109.99, starRate: 4.9, inCart: false, isFavorite: false },
  { id: 100, image: serializeImage(f10), clothName: "Kids Premium Set", price: 119.99, starRate: 5.0, inCart: false, isFavorite: false },
];

const kidsCasualProducts: KidsProduct[] = [
  { id: 101, image: serializeImage(casual1), clothName: "Casual Tee", price: 14.99, starRate: 4.1, inCart: false, isFavorite: false },
  { id: 102, image: serializeImage(casual2), clothName: "Casual Shirt", price: 19.99, starRate: 4.2, inCart: false, isFavorite: false },
  { id: 103, image: serializeImage(casual3), clothName: "Comfy Hoodie", price: 34.99, starRate: 4.3, inCart: false, isFavorite: false },
  { id: 104, image: serializeImage(casual4), clothName: "Relaxed Fit", price: 24.99, starRate: 4.2, inCart: false, isFavorite: false },
  { id: 105, image: serializeImage(casual5), clothName: "Simple Tank", price: 12.99, starRate: 4.0, inCart: false, isFavorite: false },
  { id: 106, image: serializeImage(casual6), clothName: "Casual Pants", price: 29.99, starRate: 4.3, inCart: false, isFavorite: false },
  { id: 107, image: serializeImage(casual7), clothName: "Everyday Wear", price: 22.99, starRate: 4.2, inCart: false, isFavorite: false },
  { id: 108, image: serializeImage(casual8), clothName: "Basic Top", price: 16.99, starRate: 4.1, inCart: false, isFavorite: false },
  { id: 109, image: serializeImage(casual9), clothName: "Casual Jacket", price: 39.99, starRate: 4.4, inCart: false, isFavorite: false },
  { id: 110, image: serializeImage(casual10), clothName: "Play Wear", price: 21.99, starRate: 4.2, inCart: false, isFavorite: false },
];

const kidsTrendingProducts: KidsProduct[] = [
  { id: 111, image: serializeImage(tr1), clothName: "Trendy Shirt", price: 34.99, starRate: 4.5, inCart: false, isFavorite: false },
  { id: 112, image: serializeImage(tr2), clothName: "Modern Hoodie", price: 54.99, starRate: 4.6, inCart: false, isFavorite: false },
  { id: 113, image: serializeImage(tr3), clothName: "Stylish Jacket", price: 64.99, starRate: 4.7, inCart: false, isFavorite: false },
  { id: 114, image: serializeImage(tr5), clothName: "Fashion Forward", price: 44.99, starRate: 4.5, inCart: false, isFavorite: false },
  { id: 115, image: serializeImage(tr6), clothName: "Contemporary Top", price: 39.99, starRate: 4.4, inCart: false, isFavorite: false },
  { id: 116, image: serializeImage(tr7), clothName: "Urban Style", price: 49.99, starRate: 4.6, inCart: false, isFavorite: false },
  { id: 117, image: serializeImage(tr8), clothName: "Latest Trend Coat", price: 74.99, starRate: 4.7, inCart: false, isFavorite: false },
  { id: 118, image: serializeImage(tr9), clothName: "Trendy Outfit", price: 59.99, starRate: 4.6, inCart: false, isFavorite: false },
  { id: 119, image: serializeImage(tr10), clothName: "Next Big Thing", price: 69.99, starRate: 4.7, inCart: false, isFavorite: false },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;

    let products: KidsProduct[] = [];

    switch (category) {
      case 'latest':
        products = kidsLatestProducts;
        break;
      case 'featured':
        products = kidsFeaturedProducts;
        break;
      case 'casual':
        products = kidsCasualProducts;
        break;
      case 'trending':
        products = kidsTrendingProducts;
        break;
      default:
        products = [
          ...kidsLatestProducts,
          ...kidsFeaturedProducts,
          ...kidsCasualProducts,
          ...kidsTrendingProducts,
        ];
    }

    if (limit) {
      products = products.slice(0, limit);
    }

    const validatedProducts = products.map(p => KidsProductSchema.parse(p));

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
