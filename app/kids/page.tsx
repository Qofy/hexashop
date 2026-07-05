import KidsProducts from "@/component/kids/KidsProducts"
import Discover from "@/component/Discover"
import executiveBlazer from "@/public/assets/men/featured/executive-blazer.jpg"
import eliteBlazer from '@/public/assets/men/featured/elite-blazer.jpg'

export default function Kids() {
  return (
    <div>
      <KidsProducts category="latest" title="Kids's Latest"/>
      <KidsProducts category="featured" title="Kids's Featured"/>
      <Discover 
            image1={executiveBlazer} 
            image2={eliteBlazer} 
            title="Men's Collection" 
            description1="Lorem ipsum dolor sit amet consectetur adipiscing elit. 
            Quisque faucibus ex sapien vitae pellentesque sem placerat. 
            In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.
             Pulvinar vivamus fringilla lacus nec metus bibendum egestas. "
             description2="Lorem ipsum dolor sit amet consectetur adipiscing elit. 
             Quisque faucibus ex sapien vitae pellentesque sem placerat. 
             In id cursus mi pretium tellus duis convallis. 
             Tempus leo eu aenean sed diam urna tempor. 
             Pulvinar vivamus fringilla lacus nec metus bibendum egestas. "
             href="/men"
             buttonText="Discover more"/>
      <KidsProducts category="casual" title="Casual"/>
      <KidsProducts category="trending" title="Kids's Trending"/>
    </div>
  )
};
