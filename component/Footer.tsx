'use client';

import { content } from '@/data/componentDatas/content_context';
import Link from 'next/link';

export default function Footer() {
  const footerContent = content.Footer;

  return (
    <footer className="bg-gray-900 text-gray-300 py-16 md:py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Company Info */}
          <div>
            <h2 className="text-white font-bold text-lg md:text-xl mb-6">{footerContent?.shopName}</h2>
            <div className="space-y-4 text-sm md:text-base">
              <div>
                <span className="font-semibold text-white block mb-1">Address:</span>
                <p className="text-gray-400">{footerContent?.address}</p>
              </div>
              <div>
                <span className="font-semibold text-white block mb-1">E-mail:</span>
                <p><a href={`mailto:${footerContent?.email}`} className="text-gray-400 hover:text-blue-400 transition-colors">{footerContent?.email}</a></p>
              </div>
              <div>
                <span className="font-semibold text-white block mb-1">Phone:</span>
                <p><a href={`tel:${footerContent?.phone}`} className="text-gray-400 hover:text-blue-400 transition-colors">{footerContent?.phone}</a></p>
              </div>
            </div>
          </div>

          {/* Shopping Categories */}
          <div>
            <h3 className="text-white font-bold text-lg md:text-xl mb-6">{footerContent?.shoppingCategoriesTitle}</h3>
            <ul className="space-y-3 text-sm md:text-base">
              <li>
                <Link href="/men" className="text-gray-400 hover:text-blue-400 transition-colors">
                  {footerContent?.menShopping}
                </Link>
              </li>
              <li>
                <Link href="/women" className="text-gray-400 hover:text-blue-400 transition-colors">
                  {footerContent?.womenShopping}
                </Link>
              </li>
              <li>
                <Link href="/kids" className="text-gray-400 hover:text-blue-400 transition-colors">
                  {footerContent?.kidsShopping}
                </Link>
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-white font-bold text-lg md:text-xl mb-6">{footerContent?.usefulLinksTitle}</h3>
            <ul className="space-y-3 text-sm md:text-base">
              <li>
                <Link href="/" className="text-gray-400 hover:text-blue-400 transition-colors">
                  {footerContent?.homepage}
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="text-gray-400 hover:text-blue-400 transition-colors">
                  {footerContent?.aboutUs}
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-gray-400 hover:text-blue-400 transition-colors">
                  {footerContent?.help}
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="text-gray-400 hover:text-blue-400 transition-colors">
                  {footerContent?.contactUs}
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Information */}
          <div>
            <h3 className="text-white font-bold text-lg md:text-xl mb-6">{footerContent?.helpInformationTitle}</h3>
            <ul className="space-y-3 text-sm md:text-base">
              <li>
                <Link href="/faqs" className="text-gray-400 hover:text-blue-400 transition-colors">
                  {footerContent?.faqs}
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-400 hover:text-blue-400 transition-colors">
                  {footerContent?.shipping}
                </Link>
              </li>
              <li>
                <Link href="/tracking" className="text-gray-400 hover:text-blue-400 transition-colors">
                  {footerContent?.trackingId}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-sm text-gray-500">{footerContent?.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
