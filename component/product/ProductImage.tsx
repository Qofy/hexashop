import Image from 'next/image';

type Props = {
  src: string;
  alt: string;
};

export default function ProductImage({ src, alt }: Props) {
  return (
    <div className="flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden h-96 md:h-full">
      <div className="relative w-full h-96">
        <Image src={src} alt={alt} fill className="object-contain" />
      </div>
    </div>
  );
}
