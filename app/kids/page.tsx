import KidsProducts from "@/component/kids/KidsProducts"

export default function Kids() {
  return (
    <div>
      <KidsProducts category="latest" title="Kids's Latest"/>
      <KidsProducts category="featured" title="Kids's Featured"/>
      <KidsProducts category="casual" title="Casual"/>
      <KidsProducts category="trending" title="Kids's Trending"/>
    </div>
  )
};
