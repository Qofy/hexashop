import logo from "@/public/assets/logo.png"
import { StaticImageData } from "next/image";
import { z } from "zod";
import welLog from "@/public/assets/men/anzug.jpg"
import womenSakko from "@/public/assets/women/women-sakko.png"
import accessories from "@/public/assets/accessories/accessories1.png"
import kids from "@/public/assets/kids/kids-jacke.png"
import men from "@/public/assets/men/men-sakko.png"

const ImageDataSchema = z.custom<StaticImageData>((data) => {
  return typeof data === 'object' && data !== null && 'src' in data;
}, { message: 'Invalid image data' });

const HeaderSchema = z.object({
  id: z.number(),
  logo: ImageDataSchema,
  shopName: z.string(),
  abt: z.string(),
  nav: z.array(z.object({
    label: z.string(),
    href: z.string(),
  })),
});

const HeroSchema = z.object({
  bgImage: ImageDataSchema,
  overLayText: z.string(),
  overLayPara: z.string(),
  btnText: z.string(),
});

const MenSchema = z.object({
  header: z.string(),
  desc: z.string(),
  content: z.array(z.any()),
});

const DiscoverSchema = z.object({
  image1: ImageDataSchema,
  image2: ImageDataSchema,
  title: z.string(),
  description1: z.string(),
  description2: z.string(),
  buttonText: z.string(),
});

const ContentSchema = z.object({
  Header: HeaderSchema,
  Hero: z.object({
    welcome: HeroSchema.optional(),
    women: HeroSchema.optional(),
    men: HeroSchema.optional(),
    kids: HeroSchema.optional(),
    accessories: HeroSchema.optional(),
  }),
  Men: z.object({
    menLatest: MenSchema.optional(),
  }),
  Discover: DiscoverSchema.optional(),
});

type HeaderType = z.infer<typeof HeaderSchema>;
type HeroType = z.infer<typeof HeroSchema>;
type MenType = z.infer<typeof MenSchema>;
type DiscoverType = z.infer<typeof DiscoverSchema>;
type ContentType = z.infer<typeof ContentSchema>;
const contentData = {
  "Header": {
    "id": 1,
    "logo": logo,
    "shopName": "HEXASHOP",
    "abt": "ONLINE SHOPPING",
"nav": [
  { label: "Home", href: "/home" },
  { label: "Men", href: "/men" },
  { label: "Women", href: "/women" },
  { label: "Kids", href: "/kids" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" }
],
  },
  "Hero":{
    "welcome":{
    "bgImage": welLog,
    "overLayText": "We are Hexashop",
    "overLayPara":"Look nice in a cheap cost fashion wear. We bring you the world of fashion",
    "btnText":"Purchase Now"
    },
    "women": {
    "bgImage": womenSakko,
    "overLayText": "Women",
    "overLayPara":"Women fashion selection sets and discovery",
    "btnText":"Discover More"
    },
    "men": {
    "bgImage": men,
    "overLayText": "Men",
    "overLayPara":"Be 3% of best looking men in fashion",
    "btnText":"Discover More"
    },
    "kids": {
    "bgImage": kids,
    "overLayText": "Kids",
    "overLayPara":"Make your kids looks super star",
    "btnText":"Discover More"
    },
    "accessories": {
    "bgImage": accessories,
    "overLayText": "Accessories",
    "overLayPara":"Buy more fashion and design wears at cheap price at Hexashop",
    "btnText":"Discover More"
    }
  },
  "Men":{
    "menLatest":{
    "header":"Men's Latest",
    "desc": "Discover men latest designer and fashion wears",
    "content":[]
  }
},
  "Discover": {
    "image1": welLog,
    "image2": men,
    "title": "Discover New Collection",
    "description1": "Explore our premium collection of men's fashion.",
    "description2": "From casual wear to formal suits, find your perfect style.",
    "buttonText": "Discover More"
  }
};

export const content: ContentType = ContentSchema.parse(contentData);

export { HeaderSchema, HeroSchema, MenSchema, DiscoverSchema, ContentSchema };
export type { HeaderType, HeroType, MenType, DiscoverType, ContentType };
