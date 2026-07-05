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
    <div className="flex gap-8 items-center py-16 px-6">
      {/* Left - Images */}
      <div className="flex gap-4 flex-1">
        <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={image1.src}
            alt="discover image 1"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={image2.src}
            alt="discover image 2"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Right - Content */}
      <div className="flex-1">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-gray-600 text-lg mb-3">{description1}</p>
        <p className="text-gray-600 text-lg mb-8">{description2}</p>
        <Link href={href} className="inline-block bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
          {buttonText}
        </Link>
      </div>
    </div>
  );
};