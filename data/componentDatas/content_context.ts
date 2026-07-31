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

const SubHeaderSchema = z.object({
  message: z.string(),
});

const SecondaryNavSchema = z.object({
  links: z.array(z.object({
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

const ExploreSchema = z.object({
  title: z.string(),
  paragraph1: z.string(),
  paragraph2: z.string(),
  paragraph3: z.string(),
  leatherBagsTitle: z.string(),
  leatherBagsDescription: z.string(),
  exploreMoreTitle: z.string(),
  exploreMoreDescription: z.string(),
});

const FooterSchema = z.object({
  shopName: z.string(),
  address: z.string(),
  email: z.string(),
  phone: z.string(),
  shoppingCategoriesTitle: z.string(),
  menShopping: z.string(),
  womenShopping: z.string(),
  kidsShopping: z.string(),
  usefulLinksTitle: z.string(),
  homepage: z.string(),
  aboutUs: z.string(),
  help: z.string(),
  contactUs: z.string(),
  helpInformationTitle: z.string(),
  faqs: z.string(),
  shipping: z.string(),
  trackingId: z.string(),
  copyright: z.string(),
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
    trackingNumberLabel: z.string(),
    totalAmountLabel: z.string(),
    deliveryLabel: z.string(),
    deliveryTime: z.string(),
    doneButtonText: z.string(),
  }),
  validationMessage: z.string(),
});

const AboutUsSchema = z.object({
  title: z.string(),
  missionTitle: z.string(),
  missionDescription: z.string(),
  visionTitle: z.string(),
  visionDescription: z.string(),
  targetMarketTitle: z.string(),
  targetMarketDescription: z.string(),
  coreValuesTitle: z.string(),
  coreValuesDescription: z.string(),
  historyTitle: z.string(),
  historyDescription: z.string(),
});

const ContactUsSchema = z.object({
  title: z.string(),
  salesTitle: z.string(),
  salesDescription: z.string(),
  salesLinkText: z.string(),
  supportTitle: z.string(),
  supportDescription: z.string(),
  supportButtonText: z.string(),
});

const TrackingSchema = z.object({
  title: z.string(),
  searchLabel: z.string(),
  searchPlaceholder: z.string(),
  searchButton: z.string(),
  orderStatusLabel: z.string(),
  estimatedDelivery: z.string(),
  trackingNumber: z.string(),
  orderDate: z.string(),
  noOrderMessage: z.string(),
});

const FAQSchema = z.object({
  title: z.string(),
  description: z.string(),
  items: z.array(z.object({
    id: z.number(),
    question: z.string(),
    answer: z.string(),
  })),
  contactTitle: z.string(),
  contactDescription: z.string(),
  contactButtonText: z.string(),
});

const ContentSchema = z.object({
  Header: HeaderSchema,
  SubHeader: SubHeaderSchema,
  SecondaryNav: SecondaryNavSchema,
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
  Explore: ExploreSchema.optional(),
  Footer: FooterSchema.optional(),
  Cart: CartSchema.optional(),
  Favorites: FavoritesSchema.optional(),
  Women: WomenSchema.optional(),
  Kids: KidsSchema.optional(),
  Checkout: CheckoutSchema.optional(),
  AboutUs: AboutUsSchema.optional(),
  ContactUs: ContactUsSchema.optional(),
  Tracking: TrackingSchema.optional(),
  FAQs: FAQSchema.optional(),
});

type HeaderType = z.infer<typeof HeaderSchema>;
type SubHeaderType = z.infer<typeof SubHeaderSchema>;
type SecondaryNavType = z.infer<typeof SecondaryNavSchema>;
type HeroType = z.infer<typeof HeroSchema>;
type MenType = z.infer<typeof MenSchema>;
type DiscoverType = z.infer<typeof DiscoverSchema>;
type ExploreType = z.infer<typeof ExploreSchema>;
type FooterType = z.infer<typeof FooterSchema>;
type CartType = z.infer<typeof CartSchema>;
type FavoritesType = z.infer<typeof FavoritesSchema>;
type WomenType = z.infer<typeof WomenSchema>;
type KidsType = z.infer<typeof KidsSchema>;
type CheckoutType = z.infer<typeof CheckoutSchema>;
type AboutUsType = z.infer<typeof AboutUsSchema>;
type ContactUsType = z.infer<typeof ContactUsSchema>;
type TrackingType = z.infer<typeof TrackingSchema>;
type FAQType = z.infer<typeof FAQSchema>;
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
  { label: "About Us", href: "/aboutUs" },
  { label: "Contact Us", href: "/contactUs" },
],
  },
  "SubHeader": {
    "message": "🎉 Free shipping on orders over $50! Use code SHIP50 at checkout"
  },
  "SecondaryNav": {
    "links": [
      { label: "Track Order", href: "/tracking" },
      { label: "Purchase History", href: "/purchase-history" },
      { label: "My Account", href: "/my-account" },
      { label: "My Favorites", href: "/my-favorites" },
      { label: "Support", href: "/support" },
      { label: "Returns & Exchanges", href: "/returns" },
      { label: "Size Guide", href: "/size-guide" },
    ]
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
  "Explore": {
    "title": "Explore",
    "paragraph1": "Discover our extensive collection of fashion items that cater to all your style needs. From trendy casual wear to elegant formal attire, we have something for everyone in the family.",
    "paragraph2": "Our carefully curated selection features the latest fashion trends and timeless classics. Each piece is chosen to ensure quality, comfort, and style that will make you stand out.",
    "paragraph3": "Whether you're shopping for yourself or your loved ones, our fashion collection offers incredible variety at unbeatable prices. Experience the best of fashion shopping with us today.",
    "leatherBagsTitle": "Leather Bags",
    "leatherBagsDescription": "Premium leather bags for every occasion",
    "exploreMoreTitle": "Explore more fashion wears",
    "exploreMoreDescription": "Browse through our complete collection of clothing and accessories. Find the perfect pieces that match your style and personality."
  },
  "Footer": {
    "shopName": "HEXASHOP",
    "address": "Lahore Road, Sheikhupura",
    "email": "support@hexashop.com",
    "phone": "+92 356 3656210",
    "shoppingCategoriesTitle": "Shopping and Categories",
    "menShopping": "Men's Shopping",
    "womenShopping": "Women's Shopping",
    "kidsShopping": "Kids Shopping",
    "usefulLinksTitle": "Useful Links",
    "homepage": "Homepage",
    "aboutUs": "About Us",
    "help": "Help",
    "contactUs": "Contact Us",
    "helpInformationTitle": "Help & Information",
    "faqs": "FAQ's",
    "shipping": "Shipping",
    "trackingId": "Tracking Id",
    "copyright": "Copyright © 2026 HEXASHOP. All rights reserved."
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
      "trackingNumberLabel": "Tracking Number:",
      "totalAmountLabel": "Total Amount:",
      "deliveryLabel": "Expected Delivery:",
      "deliveryTime": "5-7 Business Days",
      "doneButtonText": "Done"
    },
    "validationMessage": "Please fill in all fields"
  },
  "AboutUs": {
    "title": "About Us",
    "missionTitle": "Mission Statement",
    "missionDescription": "Our mission is to provide high-quality, affordable fashion to customers worldwide. We believe that everyone deserves to look and feel their best without breaking the bank. Through our carefully curated collections, we aim to make fashion accessible and enjoyable for all.",
    "visionTitle": "Vision Statement",
    "visionDescription": "We envision a world where fashion is inclusive, sustainable, and empowering. HEXASHOP aspires to be the leading online destination for fashion enthusiasts, offering trendy collections that celebrate individuality and self-expression.",
    "targetMarketTitle": "Target Market Summary",
    "targetMarketDescription": "Our primary audience includes fashion-conscious individuals aged 16-45 who value quality, style, and affordability. We serve men, women, and kids looking for the latest trends in casual, formal, and casual wear.",
    "coreValuesTitle": "Core Values",
    "coreValuesDescription": "Quality: We prioritize premium materials and excellent craftsmanship. Affordability: We believe great fashion shouldn't be expensive. Inclusivity: Fashion is for everyone, regardless of age, gender, or background. Sustainability: We're committed to ethical and environmentally responsible practices.",
    "historyTitle": "Brief Company History",
    "historyDescription": "HEXASHOP was founded with a simple vision: to democratize fashion and make it accessible to everyone. Starting as a small online boutique, we have grown into a trusted fashion retailer serving thousands of satisfied customers worldwide. Our journey has been driven by passion, innovation, and an unwavering commitment to customer satisfaction."
  },
  "ContactUs": {
    "title": "Get In Touch",
    "salesTitle": "Talk To Sales",
    "salesDescription": "Have questions about our products or need help finding the perfect item? Our sales team is here to assist you. We're happy to provide personalized recommendations and help you discover what you're looking for.",
    "salesLinkText": "View all global Members",
    "supportTitle": "Contact Customer Support",
    "supportDescription": "Need assistance with an order, returns, or have a general inquiry? Our dedicated customer support team is available to help you with any concerns or questions you may have about your shopping experience.",
    "supportButtonText": "Customer Support"
  },
  "Tracking": {
    "title": "Track Your Order",
    "searchLabel": "Enter your Order ID",
    "searchPlaceholder": "e.g., HEX-2024-001234",
    "searchButton": "Track Order",
    "orderStatusLabel": "Order Status",
    "estimatedDelivery": "Estimated Delivery",
    "trackingNumber": "Tracking Number",
    "orderDate": "Order Date",
    "noOrderMessage": "No order found. Please check your Order ID and try again."
  },
  "FAQs": {
    "title": "Frequently Asked Questions",
    "description": "Find answers to common questions about our products, shipping, returns, and more.",
    "items": [
      {
        "id": 1,
        "question": "What is your return policy?",
        "answer": "We offer a 30-day return policy on all items. If you're not satisfied with your purchase, you can return it within 30 days for a full refund or exchange. Items must be unused and in original packaging."
      },
      {
        "id": 2,
        "question": "How long does shipping take?",
        "answer": "Standard shipping typically takes 5-7 business days. We also offer expedited shipping (2-3 business days) and express shipping (1 business day) for an additional fee. Orders are processed within 24 hours of purchase."
      },
      {
        "id": 3,
        "question": "Do you ship internationally?",
        "answer": "Yes, we ship to over 100 countries worldwide. International shipping times vary from 7-21 business days depending on the destination. Customs and duties are the responsibility of the customer."
      },
      {
        "id": 4,
        "question": "How can I track my order?",
        "answer": "Once your order ships, you'll receive a tracking number via email. You can use this number to track your package on our website or on the carrier's website."
      },
      {
        "id": 5,
        "question": "Do you offer gift wrapping?",
        "answer": "Yes, we offer complimentary gift wrapping for all orders. Simply select the gift wrapping option at checkout, and we'll beautifully wrap your items for no extra charge."
      },
      {
        "id": 6,
        "question": "How do I apply a discount code?",
        "answer": "During checkout, you'll see a \"Promo Code\" or \"Discount Code\" field. Enter your code there before completing your purchase. The discount will be applied to your order total."
      },
      {
        "id": 7,
        "question": "What payment methods do you accept?",
        "answer": "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay for your convenience and security."
      },
      {
        "id": 8,
        "question": "How do I contact customer support?",
        "answer": "You can reach our customer support team via email at support@hexashop.com, phone at 1-800-HEXASHOP, or through our live chat feature on the website. We're available Monday-Friday, 9am-6pm EST."
      }
    ],
    "contactTitle": "Didn't find what you're looking for?",
    "contactDescription": "Our customer support team is here to help!",
    "contactButtonText": "Contact Us"
  }
};

export const content: ContentType = ContentSchema.parse(contentData);

export { HeaderSchema, SubHeaderSchema, SecondaryNavSchema, HeroSchema, MenSchema, DiscoverSchema, ExploreSchema, FooterSchema, CartSchema, FavoritesSchema, WomenSchema, KidsSchema, CheckoutSchema, AboutUsSchema, ContactUsSchema, TrackingSchema, FAQSchema, ContentSchema };
export type { HeaderType, SubHeaderType, SecondaryNavType, HeroType, MenType, DiscoverType, ExploreType, FooterType, CartType, FavoritesType, WomenType, KidsType, CheckoutType, AboutUsType, ContactUsType, TrackingType, FAQType, ContentType };
