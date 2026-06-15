import logo from "@/public/assets/logo.png"
import { StaticImageData } from "next/image";
import welLog from "@/public/assets/men/anzug.jpg"
import womenSakko from "@/public/assets/women/women-sakko.png"
import accessories from "@/public/assets/accessories/accessories1.png"
import kids from "@/public/assets/kids/kids-jacke.png"
import men from "@/public/assets/men/men-sakko.png"
// import { ReactNode } from "react";
type HeaderType = {
    id:number,
    logo:StaticImageData,
    shopName:string,
    abt:string,
    nav:string[];
}

type HeroType ={
  bgImage: StaticImageData,
  overLayText: string,
  overLayPara: string,
  btnText: string
}

type MenType= {
  header:string,
  desc:string,
  content:[]
}

type ContentType = {
    Header: HeaderType;
    Hero:{
      [key:string]: HeroType | {
        welcome?: HeroType,
        women?: HeroType,
        men?: HeroType
        kids?: HeroType
        accessories?: HeroType

      };
    };
    Men: {
     [key:string]: MenType | {
      menLatest?: MenType
     }
    }
}
export const content:ContentType = {
  "Header": {
    "id": 1,
    "logo": logo,
    "shopName": "HEXASHOP", 
    "abt": "ONLINE SHOPPING",
    "nav": ["Home", "Men's", "Women's", "Kid's", "About Us", "Contact Us"],
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
}

};
