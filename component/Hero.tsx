import Link from "next/link"
import { content } from "../data/componentDatas/content_context"

interface HeroCardProps {
  bgImage: string;
  overlayText: string;
  overlayPara: string;
  btnText: string;
  href: string;
  colSpan: string;
  rowSpan: string;
  minHeight: string;
}

function HeroCard({
  bgImage,
  overlayText,
  overlayPara,
  btnText,
  href,
  colSpan,
  rowSpan,
  minHeight,
}: HeroCardProps) {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className={`${colSpan} ${rowSpan} ${minHeight} flex items-center justify-center text-white`}
    >
      <div className="flex flex-col gap-3 md:gap-4 text-center items-center px-4 md:px-6">
        <h2 className="text-lg md:text-2xl lg:text-3xl font-bold">{overlayText}</h2>
        <p className="text-sm md:text-base opacity-90">{overlayPara}</p>
        <Link
          href={href}
          className="border-2 border-amber-50 px-6 md:px-8 py-2 md:py-2.5 w-fit text-sm md:text-base hover:bg-amber-50 hover:text-gray-900 transition-colors"
        >
          {btnText}
        </Link>
      </div>
    </div>
  );
}

export default function Hero() {
  const { Hero } = content;
  const { welcome, women, men, kids, accessories } = Hero || {};

  return (
    <div className="w-full">
      <div className="h-6 md:h-8 lg:h-8"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 min-h-60 md:min-h-150 lg:min-h-170">
          {/* Main Hero Card */}
          <HeroCard
            bgImage={welcome.bgImage.src}
            overlayText={welcome.overLayText}
            overlayPara={welcome.overLayPara}
            btnText={welcome.btnText}
            href="/"
            colSpan="col-span-1 md:col-span-2"
            rowSpan="md:row-span-2"
            minHeight="min-h-60 md:min-h-80 lg:min-h-auto"
          />

          {/* Women Card */}
          <HeroCard
            bgImage={women.bgImage.src}
            overlayText={women.overLayText}
            overlayPara={women.overLayPara}
            btnText={women.btnText}
            href="/women"
            colSpan="col-span-1"
            rowSpan="md:row-span-1 lg:row-span-1"
            minHeight="min-h-40 md:min-h-60 lg:min-h-auto"
          />

          {/* Men Card */}
          <HeroCard
            bgImage={men.bgImage.src}
            overlayText={men.overLayText}
            overlayPara={men.overLayPara}
            btnText={men.btnText}
            href="/men"
            colSpan="col-span-1"
            rowSpan="md:row-span-1 lg:row-span-1"
            minHeight="min-h-40 md:min-h-60 lg:min-h-auto"
          />

          {/* Kids Card */}
          <HeroCard
            bgImage={kids.bgImage.src}
            overlayText={kids.overLayText}
            overlayPara={kids.overLayPara}
            btnText={kids.btnText}
            href="/kids"
            colSpan="col-span-1"
            rowSpan="md:row-span-1 lg:row-span-1"
            minHeight="min-h-40 md:min-h-60 lg:min-h-auto"
          />

          {/* Accessories Card */}
          <HeroCard
            bgImage={accessories.bgImage.src}
            overlayText={accessories.overLayText}
            overlayPara={accessories.overLayPara}
            btnText={accessories.btnText}
            href="/"
            colSpan="col-span-1"
            rowSpan="md:row-span-1 lg:row-span-1"
            minHeight="min-h-40 md:min-h-60 lg:min-h-auto"
          />
        </div>
    </div>
  );
}