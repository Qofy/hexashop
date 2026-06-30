import Hero from "@/component/Hero";
import MenProducts from "@/component/men/MenProducts";
import WomenProducts from "@/component/women/WomenProducts";


export default function HomePage() {
  return (
    <>
   <Hero/>
   <div className="bg-com-bg flex flex-col px-14">
   <MenProducts category="latest" 
   limit={4} 
   title="Men's Latest Collection" 
   description="Discover the latest trends in men's fashion. 
   Explore our carefully curated collection of premium blazers, suits, 
   and jackets designed for the modern man."
   />
   <WomenProducts title="Women Latest Collection" 
   limit={4} 
   description="Explore the latest trends in women fashion. 
   Explore our carefully curated collection of premium Elegant Dress, Classic Blouse, 
   and Stylish Cardigan designed for the modern man."/>
   </div>
   </>
  )
};