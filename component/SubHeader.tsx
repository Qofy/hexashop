'use client';

import { content } from '@/data/componentDatas/content_context';

export default function SubHeader() {
  const { message } = content.SubHeader;

  return (
    <div className="fixed top-16 md:top-20 left-0 z-40 w-full bg-gradient-to-r from-amber-400 to-yellow-400 text-gray-900 py-1.5 md:py-2 px-3 md:px-6 text-center font-semibold text-xs md:text-sm">
      {message}
    </div>
  );
}
