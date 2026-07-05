import WomenProducts from "@/component/women/WomenProducts"
import Discover from "@/component/Discover"
import executiveBlazer from "@/public/assets/men/featured/executive-blazer.jpg"
import eliteBlazer from '@/public/assets/men/featured/elite-blazer.jpg'

export default function Women() {
  return (
    <div>
      <WomenProducts category="latest" title="Women's Latest"/>
      <WomenProducts category="featured" title="Women's Featured"/>
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
      <WomenProducts category="casual" title="Casual"/>
      <WomenProducts category="trending" title="Women's Trending"/>
    </div>
  )
};