import exploreBag from "@/public/assets/explore/explore-bag.png";
import fJewery from "@/public/assets/explore/f-jewery.jpg";
import menD from "@/public/assets/men/latest/elegant-d-j.jpg";
import Dexplore from "@/public/assets/explore/d-explore.png";

// type Props = {}

export default function Explore() {
  return (
    <>
    <div className="grid grid-cols-5 grid-rows-12 gap-2 min-h-120 mt-10 mx-50 mb-10 ">
        <div className="col-span-3 row-span-12 flex flex-col gap-3.5">
        <h1 className="text-2xl font-bold">Explore</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
             Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
             Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            Excepteur sint occaecat cupidatat non proident, s
            unt in culpa qui officia deserunt mollit anim id est laborum.</p>
         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
             Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
             Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            Excepteur sint occaecat cupidatat non proident, s
            unt in culpa qui officia deserunt mollit anim id est laborum.</p>
             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
             Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
             Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            Excepteur sint occaecat cupidatat non proident, s
            unt in culpa qui officia deserunt mollit anim id est laborum.</p>
        
        </div>
        <div className="row-span-6 flex flex-col items-center justify-center" 
        style={{backgroundImage:`linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)),url(${exploreBag.src})`, 
        backgroundRepeat:"no-repeat", 
        backgroundPosition: "center",
    //    objectFit:"cover",
         backgroundSize:"cover",}}>
            <p className="text-white font-bold text-2xl">
                Lether Bags
            </p>
            <p className="text-white text-center">
                Lorem ipsum dolor sit amet,  
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
            <p className="text-white font-bold text-2xl text-center">Explore more fashion wears</p>
            <p className="text-white text-center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
        </div>
    </div>
    </>
  )
};