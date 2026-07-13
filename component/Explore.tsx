import exploreBag from "@/public/assets/explore/explore-bag.png";
import fJewery from "@/public/assets/explore/f-jewery.jpg";
import menD from "@/public/assets/men/latest/elegant-d-j.jpg";
import Dexplore from "@/public/assets/explore/d-explore.png";
import { content } from "@/data/componentDatas/content_context";

export default function Explore() {
  const exploreContent = content.Explore;

  return (
    <>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 grid-rows-auto lg:grid-rows-12 gap-2 sm:gap-2.5 lg:gap-3 min-h-auto lg:min-h-120 mt-4 sm:mt-6 lg:mt-10 mx-4 sm:mx-6 lg:mx-50 mb-6 sm:mb-8 lg:mb-10">
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 row-span-auto lg:row-span-12 flex flex-col justify-center gap-2 sm:gap-2.5 lg:gap-3.5 py-4 sm:py-6 lg:py-0">
        <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold">{exploreContent?.title}</h1>
        <p className="text-xs sm:text-sm lg:text-base">{exploreContent?.paragraph1}</p>
         <p className="text-xs sm:text-sm lg:text-base">{exploreContent?.paragraph2}</p>
             <p className="text-xs sm:text-sm lg:text-base">{exploreContent?.paragraph3}</p>

        </div>
        <div className="col-span-1 sm:col-span-1 lg:col-span-1 row-span-1 sm:row-span-2 lg:row-span-6 min-h-40 sm:min-h-48 lg:min-h-auto flex flex-col items-center justify-center"
        style={{backgroundImage:`linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)),url(${exploreBag.src})`,
        backgroundRepeat:"no-repeat",
        backgroundPosition: "center",
    //    objectFit:"cover",
         backgroundSize:"cover",}}>
            <p className="text-white font-bold text-xs sm:text-sm lg:text-2xl text-center px-2">
                {exploreContent?.leatherBagsTitle}
            </p>
            <p className="text-white text-center text-xs sm:text-xs lg:text-sm px-2">
                {exploreContent?.leatherBagsDescription}
            </p>
        </div>
        <div className="col-span-1 sm:col-span-1 lg:col-span-1 row-span-1 sm:row-span-2 lg:row-span-6 min-h-40 sm:min-h-48 lg:min-h-auto"
        style={{
        backgroundImage:`url(${fJewery.src})`,
        backgroundRepeat:"no-repeat",
        backgroundPosition: "center",
    //    objectFit:"cover",
        backgroundSize:"cover",}}>
        </div>
       <div className="col-span-1 sm:col-span-1 lg:col-span-1 row-span-1 sm:row-span-2 lg:row-span-6 min-h-40 sm:min-h-48 lg:min-h-auto"
        style={{
        backgroundImage:`url(${menD.src})`,
        backgroundRepeat:"no-repeat",
        backgroundPosition: "center",
    //    objectFit:"cover",
        backgroundSize:"cover",}}>
        </div>
        <div className="col-span-1 sm:col-span-2 lg:col-span-1 row-span-1 sm:row-span-2 lg:row-span-6 min-h-40 sm:min-h-48 lg:min-h-auto flex flex-col items-center justify-center"
        style={{
        backgroundImage:`linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)),url(${Dexplore.src})`,
        backgroundRepeat:"no-repeat",
        backgroundPosition: "center",
    //    objectFit:"cover",
        backgroundSize:"cover",}}>
            <p className="text-white font-bold text-xs sm:text-sm lg:text-2xl text-center px-2">{exploreContent?.exploreMoreTitle}</p>
            <p className="text-white text-center text-xs sm:text-xs lg:text-sm px-2">
                {exploreContent?.exploreMoreDescription}
            </p>
        </div>
    </div>
    </>
  )
};