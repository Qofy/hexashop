// type Props = {}
import Link from "next/link"
import { content } from "./componentDatas/content_context"

export default function Hero() {
    const {Hero} = content
    const {welcome,women,men,kids,accessories} = Hero
    console.log(welcome.btnText)
  return (
     <div className="grid grid-cols-4 grid-rows-12 gap-2 min-h-170 mt-10 mx-50">
        {/* Home */}
        <div style={{backgroundImage:` linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)),url(${welcome.bgImage.src})`, 
        backgroundRepeat:"no-repeat", 
       backgroundPosition: "center",
    //    objectFit:"cover",
         backgroundSize:"cover",
    }} 
        className="col-span-2 row-span-12 flex items-center justify-center px-8">
            <div className="text-white flex flex-col gap-1">
            <h1 className="text-4xl font-bold">{welcome.overLayText} </h1>
            <p>{welcome.overLayPara}</p>
            <Link href="/" className="border-2 border-amber-50 px-8 py-2 w-50">{welcome.btnText}</Link>
            </div>
        </div>

        <div style={{backgroundImage:`linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url(${women.bgImage.src})`, 
        backgroundRepeat:"no-repeat", 
       backgroundPosition: "contain",
    //    objectFit:"cover",
         backgroundSize:"cover",
    }} 
        className="row-span-6 bg-amber-200"></div>

        <div style={{backgroundImage:`linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url(${men.bgImage.src})`, 
        backgroundRepeat:"no-repeat", 
       backgroundPosition: "center",
    //    objectFit:"cover",
         backgroundSize:"cover",
    }} 
        className="row-span-6 bg-amber-800"></div>

        <div style={{backgroundImage:`linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url(${kids.bgImage.src})`, 
        backgroundRepeat:"no-repeat", 
       backgroundPosition: "center",
    //    objectFit:"cover",
         backgroundSize:"cover",
    }} 
        className="row-span-6 bg-amber-300"></div>

        <div style={{backgroundImage:`linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url(${accessories.bgImage.src})`, 
        backgroundRepeat:"no-repeat", 
       backgroundPosition: "center",
    //    objectFit:"cover",
         backgroundSize:"cover",
    }} 
        className="row-span-6 bg-amber-500"></div>
    </div>
  )
};