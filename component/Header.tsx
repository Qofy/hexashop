'use client';

import { useState } from "react"
import Image from "next/image"
import { content } from "../data/componentDatas/content_context"
import Link from "next/link"
import { ShoppingCart, Heart, Menu, X } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { openCart, closeCart } from "@/slices/cartSlice"
import { openFavorites, closeFavorites } from "@/slices/favoritesSlice"
import CartModal from "./CartModal"
import FavoritesModal from "./FavoritesModal"
import type { RootState } from "@/store/store"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector((state: RootState) => state.cart.items)
  const favItems = useAppSelector((state: RootState) => state.favorites.items)
  const cartCount = cartItems.reduce((sum: number, item: typeof cartItems[0]) => sum + item.quantity, 0)
  const { Header } = content

  return (
    <header className="flex items-center justify-between fixed top-0 left-0 z-50 h-16 md:h-20 w-full bg-header-bg text-text-color px-4 md:px-8">
      {/* Logo & Brand */}
      <div className="flex gap-3 md:gap-4 items-center min-w-0">
        <Link href="/home">
          <Image
            src={Header.logo}
            alt={Header.shopName}
            width={40}
            height={40}
            className="w-10 h-10 md:w-12 md:h-12"
          />
        </Link>
        <div className="hidden sm:flex flex-col">
          <h1 className="font-bold text-sm md:text-base leading-tight">{Header.shopName}</h1>
          <p className="text-xs md:text-sm text-gray-600">{Header.abt}</p>
        </div>
      </div>

      {/* Navigation & Actions */}
      <div className="flex gap-4 md:gap-8 items-center">
        {/* Desktop Navigation */}
        {Header.nav.map((nav) => (
          <Link
            href={nav.href}
            key={nav.href}
            className="hidden md:block text-sm md:text-base hover:text-blue-600 transition-colors font-medium"
          >
            {nav.label}
          </Link>
        ))}

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 hover:bg-gray-200 bg-gray-50 rounded-lg transition-colors"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Favorites Button */}
        <button
          onClick={() => {
            dispatch(openFavorites())
            dispatch(closeCart())
          }}
          className="relative p-2 md:p-2.5 hover:bg-gray-200 bg-gray-50 rounded-lg transition-colors"
          aria-label={`Open favorites. ${favItems.length} item${favItems.length !== 1 ? 's' : ''} saved.`}
        >
          <Heart size={20} className="md:w-5 md:h-5" />
          {favItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center">
              {favItems.length}
            </span>
          )}
        </button>

        {/* Cart Button */}
        <button
          onClick={() => {
            dispatch(openCart())
            dispatch(closeFavorites())
          }}
          className="relative p-2 md:p-2.5 hover:bg-gray-200 bg-gray-50 rounded-lg transition-colors"
          aria-label={`Open shopping cart. ${cartCount} item${cartCount !== 1 ? 's' : ''} in cart.`}
        >
          <ShoppingCart size={20} className="md:w-5 md:h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <nav className="absolute top-16 md:top-20 left-0 right-0 bg-header-bg border-b border-gray-200 shadow-lg md:hidden z-40">
          <div className="flex flex-col">
            {Header.nav.map((nav) => (
              <Link
                href={nav.href}
                key={nav.href}
                className="px-4 md:px-8 py-3 md:py-4 text-sm md:text-base hover:bg-gray-100 transition-colors text-text-color border-b border-gray-100 last:border-b-0"
                onClick={() => setIsMenuOpen(false)}
              >
                {nav.label}
              </Link>
            ))}
          </div>
        </nav>
      )}

      <FavoritesModal />
      <CartModal />
    </header>
  )
}