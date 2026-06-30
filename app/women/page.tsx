import WomenProducts from "@/component/women/WomenProducts"

export default function Women() {
  return (
    <div>
      <WomenProducts category="latest" title="Women's Latest"/>
      <WomenProducts category="featured" title="Women's Featured"/>
      <WomenProducts category="casual" title="Casual"/>
      <WomenProducts category="trending" title="Women's Trending"/>
    </div>
  )
};