import Hero from "@/component/Hero";
import MenProducts from "@/component/men/MenProducts";

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
   </div>
   </>
  )
};