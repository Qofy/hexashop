'use client';

import { ChevronRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Props = {
  productName: string;
};

export default function Breadcrumb({ productName }: Props) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-4 mb-8">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        aria-label="Go back to previous page"
      >
        <ArrowLeft size={18} />
        <span>Back</span>
      </button>

      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Link href="/" className="hover:text-gray-900 transition-colors">
          Home
        </Link>
        <ChevronRight size={16} />
        <span className="text-gray-900 font-semibold">{productName}</span>
      </div>
    </div>
  );
}
