import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
// Latest imports
import classicBlazer from '@/public/assets/men/latest/clasic-blazer.jpg';
import formalSuit from '@/public/assets/men/latest/formal-suit.jpg';
import businessJacket from '@/public/assets/men/latest/business-jacket.jpg';
import premiumCoat from '@/public/assets/men/latest/primium-coat.jpg';
import casualBlazerLatest from '@/public/assets/men/latest/casual-blazer.png';
import elegantDJ from '@/public/assets/men/latest/elegant-d-j.jpg';
import smartCardigan from '@/public/assets/men/latest/smart-cardigan.jpg';
import winterCoat from '@/public/assets/men/latest/winter-coat.png';
import summerJacket from '@/public/assets/men/latest/summer-jacket.jpg';
import fashionBlazer from '@/public/assets/men/latest/fashion-blazer.png';

// Featured imports
import designerSuit from '@/public/assets/men/featured/designer-suit.jpg';
import executiveBlazer from '@/public/assets/men/featured/executive-blazer.jpg';
import luxuryCoat from '@/public/assets/men/featured/luxury-coat.png';
import premiumJacket from '@/public/assets/men/featured/premium-jacket.jpg';
import royalSuit from '@/public/assets/men/featured/royal-suit.jpg';
import eliteBlazer from '@/public/assets/men/featured/elite-blazer.jpg';
import grandCoat from '@/public/assets/men/featured/grand-coat.jpg';
import signatureJacket from '@/public/assets/men/featured/signature-jacket.png';
import heritageSuit from '@/public/assets/men/featured/heritage-suit.png';
import iconicBlazer from '@/public/assets/men/featured/iconic-blazer.png';

// Casual imports
import casualBtnUp from '@/public/assets/men/casual/casual-btn-up.jpg';
import relaxedFitShirt from '@/public/assets/men/casual/relaxed-fit-shirt.jpg';
import easyJacket from '@/public/assets/men/casual/easy-jacket.jpg';
import comfortableSweater from '@/public/assets/men/casual/confortable-sweater.jpg';
import laidBackBlazer from '@/public/assets/men/casual/laid-back-blazer.jpg';
import chillHJ from '@/public/assets/men/casual/chill-h-j.png';
import everyDayShirt from '@/public/assets/men/casual/every-day-shhirt.jpg';
import weekendJacket from '@/public/assets/men/casual/weekend-jacket.jpg';
import simpleCardigan from '@/public/assets/men/casual/simple-cardigan.png';
import casualCardigan from '@/public/assets/men/casual/casual-cardigan.jpg';

// Trending imports
import trendingBlazer from '@/public/assets/men/trending/trending-blazer.png';
import modernJacket from '@/public/assets/men/trending/morden-jacket.jpg';
import stylishCoat from '@/public/assets/men/trending/stylish-coat.jpg';
import fashionForward from '@/public/assets/men/trending/fashion-forward.jpg';
import contemporarySuit from '@/public/assets/men/trending/contemporary-suit.png';
import urbanBlazer from '@/public/assets/men/trending/urban-blazer.png';
import latestStyleCoat from '@/public/assets/men/trending/latest-style-coat.png';
import inVogueJacket from '@/public/assets/men/trending/in-vogue-jacket.png';
import hotTrendSuit from '@/public/assets/men/trending/hot-t-s.png';
import nextBigThing from '@/public/assets/men/trending/next-b-th.png';

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
  { id: 1, image: serializeImage(classicBlazer), clothName: "Classic Blazer", price: 49.99, starRate: 4.5, inCart: false, isFavorite: false },
  { id: 2, image: serializeImage(formalSuit), clothName: "Formal Suit", price: 89.99, starRate: 4.8, inCart: false, isFavorite: false },
  { id: 3, image: serializeImage(businessJacket), clothName: "Business Jacket", price: 39.99, starRate: 4.2, inCart: false, isFavorite: false },
  { id: 4, image: serializeImage(premiumCoat), clothName: "Premium Coat", price: 69.99, starRate: 4.7, inCart: false, isFavorite: false },
  { id: 5, image: serializeImage(casualBlazerLatest), clothName: "Casual Blazer", price: 34.99, starRate: 4.3, inCart: false, isFavorite: false },
  { id: 6, image: serializeImage(elegantDJ), clothName: "Elegant Dress Jacket", price: 74.99, starRate: 4.6, inCart: false, isFavorite: false },
  { id: 7, image: serializeImage(smartCardigan), clothName: "Smart Cardigan", price: 29.99, starRate: 4.1, inCart: false, isFavorite: false },
  { id: 8, image: serializeImage(winterCoat), clothName: "Winter Coat", price: 99.99, starRate: 4.9, inCart: false, isFavorite: false },
  { id: 9, image: serializeImage(summerJacket), clothName: "Summer Jacket", price: 24.99, starRate: 4.0, inCart: false, isFavorite: false },
  { id: 10, image: serializeImage(fashionBlazer), clothName: "Fashion Blazer", price: 54.99, starRate: 4.4, inCart: false, isFavorite: false },
];

const menFeaturedProducts: MenProduct[] = [
  { id: 11, image: serializeImage(designerSuit), clothName: "Designer Suit", price: 129.99, starRate: 4.9, inCart: false, isFavorite: false },
  { id: 12, image: serializeImage(executiveBlazer), clothName: "Executive Blazer", price: 59.99, starRate: 4.6, inCart: false, isFavorite: false },
  { id: 13, image: serializeImage(luxuryCoat), clothName: "Luxury Coat", price: 149.99, starRate: 5.0, inCart: false, isFavorite: false },
  { id: 14, image: serializeImage(premiumJacket), clothName: "Premium Jacket", price: 64.99, starRate: 4.7, inCart: false, isFavorite: false },
  { id: 15, image: serializeImage(royalSuit), clothName: "Royal Suit", price: 134.99, starRate: 4.8, inCart: false, isFavorite: false },
  { id: 16, image: serializeImage(eliteBlazer), clothName: "Elite Blazer", price: 79.99, starRate: 4.5, inCart: false, isFavorite: false },
  { id: 17, image: serializeImage(grandCoat), clothName: "Grand Coat", price: 119.99, starRate: 4.9, inCart: false, isFavorite: false },
  { id: 18, image: serializeImage(signatureJacket), clothName: "Signature Jacket", price: 84.99, starRate: 4.6, inCart: false, isFavorite: false },
  { id: 19, image: serializeImage(heritageSuit), clothName: "Heritage Suit", price: 159.99, starRate: 5.0, inCart: false, isFavorite: false },
  { id: 20, image: serializeImage(iconicBlazer), clothName: "Iconic Blazer", price: 99.99, starRate: 4.7, inCart: false, isFavorite: false },
];

const menCasualProducts: MenProduct[] = [
  { id: 21, image: serializeImage(casualBtnUp), clothName: "Casual Button-up", price: 19.99, starRate: 4.2, inCart: false, isFavorite: false },
  { id: 22, image: serializeImage(relaxedFitShirt), clothName: "Relaxed Fit Shirt", price: 17.99, starRate: 4.1, inCart: false, isFavorite: false },
  { id: 23, image: serializeImage(easyJacket), clothName: "Easy Jacket", price: 27.99, starRate: 4.3, inCart: false, isFavorite: false },
  { id: 24, image: serializeImage(comfortableSweater), clothName: "Comfortable Sweater", price: 24.99, starRate: 4.0, inCart: false, isFavorite: false },
  { id: 25, image: serializeImage(laidBackBlazer), clothName: "Laid-back Blazer", price: 32.99, starRate: 4.4, inCart: false, isFavorite: false },
  { id: 26, image: serializeImage(chillHJ), clothName: "Chill Hoodie Jacket", price: 21.99, starRate: 4.2, inCart: false, isFavorite: false },
  { id: 27, image: serializeImage(everyDayShirt), clothName: "Everyday Shirt", price: 15.99, starRate: 3.9, inCart: false, isFavorite: false },
  { id: 28, image: serializeImage(weekendJacket), clothName: "Weekend Jacket", price: 30.99, starRate: 4.3, inCart: false, isFavorite: false },
  { id: 29, image: serializeImage(simpleCardigan), clothName: "Simple Cardigan", price: 26.99, starRate: 4.1, inCart: false, isFavorite: false },
  { id: 30, image: serializeImage(casualCardigan), clothName: "Casual Cardigan", price: 23.99, starRate: 4.2, inCart: false, isFavorite: false },
];

const menTrendingProducts: MenProduct[] = [
  { id: 31, image: serializeImage(trendingBlazer), clothName: "Trendy Blazer", price: 44.99, starRate: 4.6, inCart: false, isFavorite: false },
  { id: 32, image: serializeImage(modernJacket), clothName: "Modern Jacket", price: 39.99, starRate: 4.5, inCart: false, isFavorite: false },
  { id: 33, image: serializeImage(stylishCoat), clothName: "Stylish Coat", price: 59.99, starRate: 4.7, inCart: false, isFavorite: false },
  { id: 34, image: serializeImage(fashionForward), clothName: "Fashion Forward", price: 42.99, starRate: 4.4, inCart: false, isFavorite: false },
  { id: 35, image: serializeImage(contemporarySuit), clothName: "Contemporary Suit", price: 94.99, starRate: 4.8, inCart: false, isFavorite: false },
  { id: 36, image: serializeImage(urbanBlazer), clothName: "Urban Blazer", price: 47.99, starRate: 4.5, inCart: false, isFavorite: false },
  { id: 37, image: serializeImage(latestStyleCoat), clothName: "Latest Style Coat", price: 64.99, starRate: 4.6, inCart: false, isFavorite: false },
  { id: 38, image: serializeImage(inVogueJacket), clothName: "In-Vogue Jacket", price: 41.99, starRate: 4.4, inCart: false, isFavorite: false },
  { id: 39, image: serializeImage(hotTrendSuit), clothName: "Hot Trend Suit", price: 89.99, starRate: 4.7, inCart: false, isFavorite: false },
  { id: 40, image: serializeImage(nextBigThing), clothName: "Next Big Thing", price: 52.99, starRate: 4.5, inCart: false, isFavorite: false },
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
