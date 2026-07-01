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
  href: z.string(),
});

const CartSchema = z.object({
  title: z.string(),
  emptyMessage: z.string(),
  loadingMessage: z.string(),
  totalLabel: z.string(),
  checkoutButton: z.string(),
});

const FavoritesSchema = z.object({
  title: z.string(),
  emptyMessage: z.string(),
  addToCartButton: z.string(),
});

const WomenSchema = z.object({
  loadingMessage: z.string(),
  errorMessage: z.string(),
  emptyMessage: z.string(),
});

const KidsSchema = z.object({
  loadingMessage: z.string(),
  errorMessage: z.string(),
  emptyMessage: z.string(),
});

const CheckoutSchema = z.object({
  form: z.object({
    title: z.string(),
    personalInfo: z.string(),
    shippingAddress: z.string(),
    paymentMethod: z.string(),
    placeOrderButton: z.string(),
    processingButton: z.string(),
    firstNamePlaceholder: z.string(),
    lastNamePlaceholder: z.string(),
    emailPlaceholder: z.string(),
    phonePlaceholder: z.string(),
    addressPlaceholder: z.string(),
    cityPlaceholder: z.string(),
    statePlaceholder: z.string(),
    zipCodePlaceholder: z.string(),
    creditCardLabel: z.string(),
    debitCardLabel: z.string(),
    upiLabel: z.string(),
    codLabel: z.string(),
    subtotalLabel: z.string(),
    shippingLabel: z.string(),
    totalLabel: z.string(),
    freeShipping: z.string(),
  }),
  orderConfirmation: z.object({
    title: z.string(),
    description: z.string(),
    totalLabel: z.string(),
    continueButtonText: z.string(),
  }),
  congratulations: z.object({
    title: z.string(),
    description: z.string(),
    thankYouMessage: z.string(),
    orderIdLabel: z.string(),
    totalAmountLabel: z.string(),
    deliveryLabel: z.string(),
    deliveryTime: z.string(),
    doneButtonText: z.string(),
  }),
  validationMessage: z.string(),
});

const ContentSchema = z.object({
  Header: HeaderSchema,
  Hero: z.object({
    welcome: HeroSchema,
    women: HeroSchema,
    men: HeroSchema,
    kids: HeroSchema,
    accessories: HeroSchema,
  }),
  Men: z.object({
    menLatest: MenSchema.optional(),
  }),
  Discover: DiscoverSchema.optional(),
  Cart: CartSchema.optional(),
  Favorites: FavoritesSchema.optional(),
  Women: WomenSchema.optional(),
  Kids: KidsSchema.optional(),
  Checkout: CheckoutSchema.optional(),
});

type HeaderType = z.infer<typeof HeaderSchema>;
type HeroType = z.infer<typeof HeroSchema>;
type MenType = z.infer<typeof MenSchema>;
type DiscoverType = z.infer<typeof DiscoverSchema>;
type CartType = z.infer<typeof CartSchema>;
type FavoritesType = z.infer<typeof FavoritesSchema>;
type WomenType = z.infer<typeof WomenSchema>;
type KidsType = z.infer<typeof KidsSchema>;
type CheckoutType = z.infer<typeof CheckoutSchema>;
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
    "buttonText": "Discover More",
    "href": "/men"
  },
  "Cart": {
    "title": "Shopping Cart",
    "emptyMessage": "Your cart is empty",
    "loadingMessage": "Loading products...",
    "totalLabel": "Total:",
    "checkoutButton": "Checkout"
  },
  "Favorites": {
    "title": "My Favorites",
    "emptyMessage": "No favorites yet",
    "addToCartButton": "Add to Cart"
  },
  "Women": {
    "loadingMessage": "Loading products...",
    "errorMessage": "Error loading products: ",
    "emptyMessage": "No products found"
  },
  "Kids": {
    "loadingMessage": "Loading products...",
    "errorMessage": "Error loading products: ",
    "emptyMessage": "No products found"
  },
  "Checkout": {
    "form": {
      "title": "Checkout",
      "personalInfo": "Personal Information",
      "shippingAddress": "Shipping Address",
      "paymentMethod": "Payment Method",
      "placeOrderButton": "Place Order",
      "processingButton": "Processing...",
      "firstNamePlaceholder": "First Name",
      "lastNamePlaceholder": "Last Name",
      "emailPlaceholder": "Email",
      "phonePlaceholder": "Phone Number",
      "addressPlaceholder": "Address",
      "cityPlaceholder": "City",
      "statePlaceholder": "State",
      "zipCodePlaceholder": "Zip Code",
      "creditCardLabel": "Credit Card",
      "debitCardLabel": "Debit Card",
      "upiLabel": "UPI",
      "codLabel": "Cash on Delivery",
      "subtotalLabel": "Subtotal:",
      "shippingLabel": "Shipping:",
      "totalLabel": "Total:",
      "freeShipping": "Free"
    },
    "orderConfirmation": {
      "title": "Order Placed!",
      "description": "Thank you for your purchase. Your order has been confirmed and will be processed soon.",
      "totalLabel": "Order Total",
      "continueButtonText": "Continue Shopping"
    },
    "congratulations": {
      "title": "🎉 Congratulations!",
      "description": "Your order has been placed successfully",
      "thankYouMessage": "We'll send you updates on your order status via email. Thank you for shopping with us!",
      "orderIdLabel": "Order ID:",
      "totalAmountLabel": "Total Amount:",
      "deliveryLabel": "Expected Delivery:",
      "deliveryTime": "5-7 Business Days",
      "doneButtonText": "Done"
    },
    "validationMessage": "Please fill in all fields"
  }
};

export const content: ContentType = ContentSchema.parse(contentData);

export { HeaderSchema, HeroSchema, MenSchema, DiscoverSchema, CartSchema, FavoritesSchema, WomenSchema, KidsSchema, CheckoutSchema, ContentSchema };
export type { HeaderType, HeroType, MenType, DiscoverType, CartType, FavoritesType, WomenType, KidsType, CheckoutType, ContentType };
