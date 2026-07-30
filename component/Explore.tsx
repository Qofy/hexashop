import exploreBag from "@/public/assets/explore/explore-bag.png";
import fJewery from "@/public/assets/explore/f-jewery.jpg";
import menD from "@/public/assets/men/latest/elegant-d-j.jpg";
import Dexplore from "@/public/assets/explore/d-explore.png";
import { content } from "@/data/componentDatas/content_context";
import Section from "./Section";
import Container from "./Container";

interface ExploreCardProps {
  bgImage: string;
  title?: string;
  description?: string;
  colSpan: string;
  rowSpan: string;
  minHeight: string;
}

function ExploreCard({
  bgImage,
  title,
  description,
  colSpan,
  rowSpan,
  minHeight,
}: ExploreCardProps) {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className={`${colSpan} ${rowSpan} ${minHeight} flex flex-col items-center justify-center text-white text-center`}
    >
      {title && <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 px-4">{title}</h3>}
      {description && <p className="text-sm md:text-base opacity-90 px-4">{description}</p>}
    </div>
  );
}

function ImageCard({
  bgImage,
  colSpan,
  rowSpan,
  minHeight,
}: Omit<ExploreCardProps, 'title' | 'description'>) {
  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className={`${colSpan} ${rowSpan} ${minHeight}`}
    />
  );
}

export default function Explore() {
  const exploreContent = content.Explore;

  return (
    <Section bgColor="bg-white" padding="lg">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 lg:grid-rows-12 gap-4 md:gap-6 min-h-auto lg:min-h-120">
          {/* Text Content */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 lg:row-span-12 flex flex-col justify-center gap-4 md:gap-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
              {exploreContent?.title}
            </h2>
            <p className="text-base md:text-lg leading-relaxed">
              {exploreContent?.paragraph1}
            </p>
            <p className="text-base md:text-lg leading-relaxed">
              {exploreContent?.paragraph2}
            </p>
            <p className="text-base md:text-lg leading-relaxed">
              {exploreContent?.paragraph3}
            </p>
          </div>

          {/* Leather Bags Card */}
          <ExploreCard
            bgImage={exploreBag.src}
            title={exploreContent?.leatherBagsTitle}
            description={exploreContent?.leatherBagsDescription}
            colSpan="col-span-1"
            rowSpan="sm:row-span-2 lg:row-span-6"
            minHeight="min-h-40 sm:min-h-48 lg:min-h-auto"
          />

          {/* Jewelry Image */}
          <ImageCard
            bgImage={fJewery.src}
            colSpan="col-span-1"
            rowSpan="sm:row-span-2 lg:row-span-6"
            minHeight="min-h-40 sm:min-h-48 lg:min-h-auto"
          />

          {/* Men's Dress Image */}
          <ImageCard
            bgImage={menD.src}
            colSpan="col-span-1"
            rowSpan="sm:row-span-2 lg:row-span-6"
            minHeight="min-h-40 sm:min-h-48 lg:min-h-auto"
          />

          {/* Explore More Card */}
          <ExploreCard
            bgImage={Dexplore.src}
            title={exploreContent?.exploreMoreTitle}
            description={exploreContent?.exploreMoreDescription}
            colSpan="col-span-1 sm:col-span-2 lg:col-span-1"
            rowSpan="sm:row-span-2 lg:row-span-6"
            minHeight="min-h-40 sm:min-h-48 lg:min-h-auto"
          />
        </div>
      </Container>
    </Section>
  );
}