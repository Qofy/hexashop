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
    <div className="flex gap-8 items-center py-16 px-6  bg-gray-500">
      {/* Left - Images */}
      <div className="flex gap-4 flex-1">
        <div className="relative w-full h-96 bg-gray-00 rounded-lg overflow-hidden">
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
      <div className="flex-1 text-amber-50">
        <h1 className="text-5xl font-bold  mb-4">{title}</h1>
        <p className=" text-lg mb-3">{description1}</p>
        <p className=" text-lg mb-8">{description2}</p>
        <Link href={href} className="inline-block bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
          {buttonText}
        </Link>
      </div>
    </div>
  );
};