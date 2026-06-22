import MenProducts from "@/component/men/MenProducts"

// type Props = {}

export default function Men() {
  return (
    <div>
      <MenProducts category="latest" title="Men's Latest"/>
      <MenProducts category="featured" title="Futured"/>
      <MenProducts category="casual" title="Casual"/>
      <MenProducts category="trending" title="Men's Treding"/>

    </div>
  )
};