'use client';

import { content } from '@/data/componentDatas/content_context';
import Link from 'next/link';

export default function Footer() {
  const footerContent = content.Footer;

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h2 className="text-white font-bold text-lg mb-4">{footerContent?.shopName}</h2>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-semibold text-white">Address:</span>
                <p>{footerContent?.address}</p>
              </div>
              <div>
                <span className="font-semibold text-white">E-mail:</span>
                <p><a href={`mailto:${footerContent?.email}`} className="hover:text-blue-400 transition-colors">{footerContent?.email}</a></p>
              </div>
              <div>
                <span className="font-semibold text-white">Phone:</span>
                <p><a href={`tel:${footerContent?.phone}`} className="hover:text-blue-400 transition-colors">{footerContent?.phone}</a></p>
              </div>
            </div>
          </div>

          {/* Shopping and Categories */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{footerContent?.shoppingCategoriesTitle}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/men" className="hover:text-blue-400 transition-colors">
                  {footerContent?.menShopping}
                </Link>
              </li>
              <li>
                <Link href="/women" className="hover:text-blue-400 transition-colors">
                  {footerContent?.womenShopping}
                </Link>
              </li>
              <li>
                <Link href="/kids" className="hover:text-blue-400 transition-colors">
                  {footerContent?.kidsShopping}
                </Link>
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{footerContent?.usefulLinksTitle}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-blue-400 transition-colors">
                  {footerContent?.homepage}
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-blue-400 transition-colors">
                  {footerContent?.aboutUs}
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-blue-400 transition-colors">
                  {footerContent?.help}
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-blue-400 transition-colors">
                  {footerContent?.contactUs}
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Information */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{footerContent?.helpInformationTitle}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faqs" className="hover:text-blue-400 transition-colors">
                  {footerContent?.faqs}
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-blue-400 transition-colors">
                  {footerContent?.shipping}
                </Link>
              </li>
              <li>
                <Link href="/tracking" className="hover:text-blue-400 transition-colors">
                  {footerContent?.trackingId}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-sm text-gray-400">{footerContent?.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
