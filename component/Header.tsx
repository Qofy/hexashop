'use client';

import Image from "next/image"
import { content } from "../data/componentDatas/content_context"
import Link from "next/link"
import { ShoppingCart, Heart } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { openCart } from "@/slices/cartSlice"
import { openFavorites } from "@/slices/favoritesSlice"
import CartModal from "./CartModal"
import FavoritesModal from "./FavoritesModal"
import type { RootState } from "@/store/store"

export default function Header() {
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector((state: RootState) => state.cart.items)
  const favItems = useAppSelector((state: RootState) => state.favorites.items)
  const cartCount = cartItems.reduce((sum: number, item: typeof cartItems[0]) => sum + item.quantity, 0)
  const {Header} = content
  return (
    <header className="flex items-center justify-between fixed top-0 left-0 z-50 h-20 w-full bg-header-bg text-text-color px-30">

        <div className="flex gap-1.5">
          <Link href="/home">          
            <Image src={Header.logo} 
          alt={Header.shopName}
          width={50}
          height={50}
          />
          </Link>
            <div className="flex flex-col ">
            <h1 className="font-bold">{Header.shopName}</h1>
            <p className="text-[0.7rem]">{Header.abt}</p>
            </div>
        </div>
        <div className="flex gap-6.5 items-center">
    {Header.nav.map((nav) => (
     <Link href={nav.href} key={nav.href} className="">
     {nav.label}
   </Link>
 ))}
          <button
            onClick={() => dispatch(openFavorites())}
            className="relative p-2 hover:bg-gray-200 bg-gray-50 rounded-full transition-colors"
          >
            <Heart size={20} />
            {favItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {favItems.length}
              </span>
            )}
          </button>

          <button
            onClick={() => dispatch(openCart())}
            className="relative p-2 hover:bg-gray-200 bg-gray-50 rounded-full transition-colors"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      <FavoritesModal />
      <CartModal />
    </header>
  )
};