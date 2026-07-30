'use client';

import { content } from '@/data/componentDatas/content_context';

export default function SubHeader() {
  const { message } = content.SubHeader;

  return (
    <div className="fixed top-16 md:top-20 left-0 z-30 w-full bg-gradient-to-r from-amber-400 to-yellow-400 text-gray-900 py-2 md:py-2.5 px-4 md:px-8 text-center font-semibold text-xs md:text-sm">
      {message}
    </div>
  );
}
