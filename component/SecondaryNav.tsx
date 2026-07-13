'use client';

import { content } from '@/data/componentDatas/content_context';
import Link from 'next/link';

export default function SecondaryNav() {
  const { links } = content.SecondaryNav;

  return (
    <nav className="fixed top-16 md:top-20 left-0 z-30 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 md:px-6">
        <div className="flex items-center justify-center gap-2 md:gap-8 py-2 md:py-3 flex-wrap">
          {links.map((link, index) => (
            <div key={link.href} className="flex items-center">
              <Link
                href={link.href}
                className="text-xs md:text-sm text-gray-700 hover:text-blue-600 font-medium transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
              {index < links.length - 1 && (
                <span className="ml-2 md:ml-8 text-gray-300">|</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
