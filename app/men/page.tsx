import { Metadata } from "next";
import Discover from "@/component/Discover"
import MenProducts from "@/component/men/MenProducts"
import Section from "@/component/Section"
import Container from "@/component/Container"
import f1 from "@/public/assets/women/featured/f1.png"
import tr2 from "@/public/assets/women/trending/tr2.png"

export const metadata: Metadata = {
  title: "Men's Fashion - HexaShop",
  description: "Shop the latest men's fashion and accessories. Explore our collection of casual wear, formal wear, and trending styles.",
};

export default function Men() {
  return (
    <>
      <Section bgColor="bg-white" padding="sm">
        <div className="h-6 md:h-8 lg:h-8"></div>
        <Container>
          <MenProducts category="latest" title="Men's Latest"/>
        </Container>
      </Section>

      <Section bgColor="bg-white" padding="md">
        <Container>
          <MenProducts category="featured" title="Men's Featured"/>
        </Container>
      </Section>

      <Discover
        image1={tr2}
        image2={f1}
        title="Women Collections"
        description1="Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. "
        description2="Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. "
        href="/women"
        buttonText="Discover more"
      />

      <Section bgColor="bg-white" padding="md">
        <Container>
          <MenProducts category="casual" title="Casual"/>
        </Container>
      </Section>

      <Section bgColor="bg-white" padding="md">
        <Container>
          <MenProducts category="trending" title="Men's Trending"/>
        </Container>
      </Section>
    </>
  )
};