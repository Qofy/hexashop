import exploreBag from "@/public/assets/explore/explore-bag.png";
import fJewery from "@/public/assets/explore/f-jewery.jpg";
import menD from "@/public/assets/men/latest/elegant-d-j.jpg";
import Dexplore from "@/public/assets/explore/d-explore.png";
import { content } from "@/data/componentDatas/content_context";

export default function Explore() {
  const exploreContent = content.Explore;

  return (
    <>
    <div className="grid grid-cols-5 grid-rows-12 gap-2 min-h-120 mt-10 mx-50 mb-10 ">
        <div className="col-span-3 row-span-12 flex flex-col justify-center gap-3.5">
        <h1 className="text-2xl font-bold">{exploreContent?.title}</h1>
        <p>{exploreContent?.paragraph1}</p>
         <p>{exploreContent?.paragraph2}</p>
             <p>{exploreContent?.paragraph3}</p>
        
        </div>
        <div className="row-span-6 flex flex-col items-center justify-center"
        style={{backgroundImage:`linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)),url(${exploreBag.src})`,
        backgroundRepeat:"no-repeat",
        backgroundPosition: "center",
    //    objectFit:"cover",
         backgroundSize:"cover",}}>
            <p className="text-white font-bold text-2xl">
                {exploreContent?.leatherBagsTitle}
            </p>
            <p className="text-white text-center">
                {exploreContent?.leatherBagsDescription}
            </p>
        </div>
        <div className="row-span-6" 
        style={{
        backgroundImage:`url(${fJewery.src})`, 
        backgroundRepeat:"no-repeat", 
        backgroundPosition: "center",
    //    objectFit:"cover",
        backgroundSize:"cover",}}>
        </div>
       <div className="row-span-6" 
        style={{
        backgroundImage:`url(${menD.src})`, 
        backgroundRepeat:"no-repeat", 
        backgroundPosition: "center",
    //    objectFit:"cover",
        backgroundSize:"cover",}}>
        </div>
        <div className="row-span-6 flex flex-col items-center justify-center"
        style={{
        backgroundImage:`linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)),url(${Dexplore.src})`,
        backgroundRepeat:"no-repeat",
        backgroundPosition: "center",
    //    objectFit:"cover",
        backgroundSize:"cover",}}>
            <p className="text-white font-bold text-2xl text-center">{exploreContent?.exploreMoreTitle}</p>
            <p className="text-white text-center">
                {exploreContent?.exploreMoreDescription}
            </p>
        </div>
    </div>
    </>
  )
};