import logo from "@/public/assets/logo.png"
import { StaticImageData } from "next/image";
import { ReactNode } from "react";
type HeaderType = {
    id:number,
    logo:StaticImageData,
    shopName:string,
    abt:string,
    nav:string[];
}

type ContentType = {
    Header: HeaderType
}
export const content:ContentType = {
  "Header": {
    "id": 1,
    "logo": logo,
    "shopName": "HEXASHOP", 
    "abt": "ONLINE SHOPPING",
    "nav": ["Home", "Men's", "Women's", "Kid's", "About Us", "Contact Us"]
  }
};
