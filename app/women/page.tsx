import WomenProducts from "@/component/women/WomenProducts"
import Discover from "@/component/Discover"
import l2 from "@/public/assets/kids/latest/l2.png"
import f5 from '@/public/assets/kids/featured/f5.png'

export default function Women() {
  return (
    <div>
      <WomenProducts category="latest" title="Women's Latest"/>
      <WomenProducts category="featured" title="Women's Featured"/>
      <Discover 
      image1={l2} 
      image2={f5} 
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
       href="/kids"
       buttonText="Discover more"/>
      <WomenProducts category="casual" title="Casual"/>
      <WomenProducts category="trending" title="Women's Trending"/>
    </div>
  )
};