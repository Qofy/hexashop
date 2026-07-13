'use client';

import Image from 'next/image';
import Link from 'next/link';
import { DiscoverType,  } from '@/data/componentDatas/content_context';

type Props = DiscoverType;

export default function Discover({
  image1,
  image2,
  title,
  description1,
  description2,
  buttonText,
  href,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center py-6 md:py-16 px-4 md:px-6 bg-gray-500">
      {/* Left - Images */}
      <div className="flex gap-2 md:gap-4 flex-1 w-full">
        <div className="relative w-full h-40 sm:h-48 md:h-72 lg:h-96 bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={image1.src}
            alt="discover image 1"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative w-full h-40 sm:h-48 md:h-72 lg:h-96 bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={image2.src}
            alt="discover image 2"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Right - Content */}
      <div className="flex-1 text-amber-50 w-full">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">{title}</h1>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg mb-2 md:mb-3">{description1}</p>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg mb-4 md:mb-8">{description2}</p>
        <Link href={href} className="inline-block bg-blue-500 text-white px-4 sm:px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors text-sm md:text-base">
          {buttonText}
        </Link>
      </div>
    </div>
  );
};