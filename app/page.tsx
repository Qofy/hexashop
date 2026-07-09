import { Metadata } from "next";
import Image from "next/image";
import HomePage from "./home/page";
import Men from "./men/page";

export const metadata: Metadata = {
  title: "HexaShop - Premium Fashion & Accessories",
  description: "Discover premium fashion and accessories for men, women, and kids at HexaShop. Shop the latest trends with fast shipping.",
};

export default function Home() {
  return (
    <div className="flex flex-col flex-1  bg-zinc-50 font-sans dark:bg-white text-black">
     <HomePage/>
     <Men/>
    </div>
  );
}
