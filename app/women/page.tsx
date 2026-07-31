import { Metadata } from "next";
import WomenProducts from "@/component/women/WomenProducts"
import Discover from "@/component/Discover"
import Section from "@/component/Section"
import Container from "@/component/Container"
import l2 from "@/public/assets/kids/latest/l2.png"
import f5 from '@/public/assets/kids/featured/f5.png'

export const metadata: Metadata = {
  title: "Women's Fashion - HexaShop",
  description: "Discover stylish women's fashion and accessories. Browse our collection of latest trends, featured items, and exclusive styles.",
};

export default function Women() {
  return (
    <>
      <Section bgColor="bg-body-bg" padding="sm">
        <div className="h-6 md:h-8 lg:h-8"></div>
        <Container>
          <WomenProducts category="latest" title="Women's Latest"/>
        </Container>
      </Section>

      <Section bgColor="bg-body-bg" padding="md">
        <Container>
          <WomenProducts category="featured" title="Women's Featured"/>
        </Container>
      </Section>

      <Discover
        image1={l2}
        image2={f5}
        title="Men's Collection"
        description1="Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. "
        description2="Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. "
        href="/kids"
        buttonText="Discover more"
      />

      <Section bgColor="bg-body-bg" padding="md">
        <Container>
          <WomenProducts category="casual" title="Casual"/>
        </Container>
      </Section>

      <Section bgColor="bg-body-bg" padding="md">
        <Container>
          <WomenProducts category="trending" title="Women's Trending"/>
        </Container>
      </Section>
    </>
  )
};