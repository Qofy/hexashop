// type Props = {}
import Link from "next/link"
import { content } from "../data/componentDatas/content_context"

export default function Hero() {
    const {Hero} = content
    const {welcome,women,men,kids,accessories} = Hero || {}
  return (
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 md:gap-2 min-h-screen md:min-h-150 lg:min-h-170 mt-4 md:mt-6 lg:mt-10 mx-4 md:mx-8 lg:mx-50 mb-4 md:mb-6 lg:mb-10 text-white">
        {/* Home */}
        <div style={{backgroundImage:` linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)),url(${welcome.bgImage.src})`,
        backgroundRepeat:"no-repeat",
       backgroundPosition: "center",
    //    objectFit:"cover",
         backgroundSize:"cover",
    }}
        className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 md:row-span-2 lg:row-span-12 min-h-60 md:min-h-80 lg:min-h-auto flex items-center justify-center px-4 md:px-6 lg:px-8">
            <div className="flex flex-col gap-0.5 md:gap-1">
            <h1 className="text-xl md:text-3xl lg:text-4xl font-bold">{welcome.overLayText} </h1>
            <p className="text-xs md:text-sm lg:text-base">{welcome.overLayPara}</p>
            <Link href="/" className="border-2 border-amber-50 px-4 md:px-6 lg:px-8 py-1.5 md:py-2 w-fit text-xs md:text-sm lg:text-base hover:bg-amber-50 hover:text-gray-900 transition-colors">{welcome.btnText}</Link>
            </div>
        </div>

        <div style={{backgroundImage:`linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url(${women.bgImage.src})`,
        backgroundRepeat:"no-repeat",
       backgroundPosition: "contain",
    //    objectFit:"cover",
         backgroundSize:"cover",
    }}
        className="col-span-1 md:col-span-1 lg:col-span-1 row-span-1 md:row-span-1 lg:row-span-6 min-h-40 md:min-h-60 lg:min-h-auto flex items-center justify-center">
          <div className="flex flex-col gap-0.5 md:gap-1 px-3 md:px-4 lg:px-6">
            <h1 className="text-sm md:text-lg lg:text-2xl font-bold text-center">{women.overLayText} </h1>
            <p className="text-xs md:text-xs lg:text-sm">{women.overLayPara}</p>
            <Link href="/women" className="border-2 border-amber-50 px-3 md:px-6 lg:px-8 py-1 md:py-2 w-fit text-xs lg:text-sm hover:bg-amber-50 hover:text-gray-900 transition-colors">{women.btnText}</Link>
            </div>
        </div>

        <div style={{backgroundImage:`linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url(${men.bgImage.src})`,
        backgroundRepeat:"no-repeat",
       backgroundPosition: "center",
    //    objectFit:"cover",
         backgroundSize:"cover",
    }}
        className="col-span-1 md:col-span-1 lg:col-span-1 row-span-1 md:row-span-1 lg:row-span-6 min-h-40 md:min-h-60 lg:min-h-auto flex flex-col items-center justify-center">
          <div className="flex flex-col gap-0.5 md:gap-1 px-3 md:px-4 lg:px-6">
            <h1 className="text-sm md:text-lg lg:text-2xl font-bold text-center">{men.overLayText} </h1>
            <p className="text-xs md:text-xs lg:text-sm">{men.overLayPara}</p>
            <Link href="/men" className="border-2 border-amber-50 px-3 md:px-6 lg:px-8 py-1 md:py-2 w-fit text-xs lg:text-sm hover:bg-amber-50 hover:text-gray-900 transition-colors">{men.btnText}</Link>
            </div>
        </div>

        <div style={{backgroundImage:`linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url(${kids.bgImage.src})`,
        backgroundRepeat:"no-repeat",
       backgroundPosition: "center",
    //    objectFit:"cover",
         backgroundSize:"cover",
    }}
        className="col-span-1 md:col-span-1 lg:col-span-1 row-span-1 md:row-span-1 lg:row-span-6 min-h-40 md:min-h-60 lg:min-h-auto flex justify-center items-center">
          <div className="flex flex-col gap-0.5 md:gap-1 px-3 md:px-4 lg:px-6">
            <h1 className="text-sm md:text-lg lg:text-2xl font-bold text-center">{kids.overLayText} </h1>
            <p className="text-xs md:text-xs lg:text-sm">{kids.overLayPara}</p>
            <Link href="/kids" className="border-2 border-amber-50 px-3 md:px-6 lg:px-8 py-1 md:py-2 w-fit text-xs lg:text-sm hover:bg-amber-50 hover:text-gray-900 transition-colors">{kids.btnText}</Link>
            </div>
        </div>

        <div style={{backgroundImage:`linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url(${accessories.bgImage.src})`,
        backgroundRepeat:"no-repeat",
       backgroundPosition: "center",
    //    objectFit:"cover",
         backgroundSize:"cover",
    }}
        className="col-span-1 md:col-span-1 lg:col-span-1 row-span-1 md:row-span-1 lg:row-span-6 min-h-40 md:min-h-60 lg:min-h-auto flex items-center justify-center">
          <div className="flex flex-col gap-0.5 md:gap-1 px-3 md:px-4 lg:px-6">
            <h1 className="text-sm md:text-lg lg:text-2xl font-bold text-center">{accessories.overLayText} </h1>
            <p className="text-xs md:text-xs lg:text-sm">{accessories.overLayPara}</p>
            <Link href="/" className="border-2 border-amber-50 px-3 md:px-6 lg:px-8 py-1 md:py-2 w-fit text-xs lg:text-sm hover:bg-amber-50 hover:text-gray-900 transition-colors">{accessories.btnText}</Link>
            </div>
        </div>
    </div>
  )
};