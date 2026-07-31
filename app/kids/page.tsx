import { Metadata } from "next";
import KidsProducts from "@/component/kids/KidsProducts"
import Discover from "@/component/Discover"
import Section from "@/component/Section"
import Container from "@/component/Container"
import executiveBlazer from "@/public/assets/men/featured/executive-blazer.jpg"
import eliteBlazer from '@/public/assets/men/featured/elite-blazer.jpg'

export const metadata: Metadata = {
  title: "Kids' Fashion - HexaShop",
  description: "Shop quality clothing and accessories for kids. Find the latest and featured kids' fashion at great prices.",
};

export default function Kids() {
  return (
    <>
      <Section bgColor="bg-body-bg" padding="sm">
        <div className="h-6 md:h-8 lg:h-8"></div>
        <Container>
          <KidsProducts category="latest" title="Kids's Latest"/>
        </Container>
      </Section>

      <Section bgColor="bg-body-bg" padding="md">
        <Container>
          <KidsProducts category="featured" title="Kids's Featured"/>
        </Container>
      </Section>

      <Discover
        image1={executiveBlazer}
        image2={eliteBlazer}
        title="Men's Collection"
        description1="Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. "
        description2="Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. "
        href="/men"
        buttonText="Discover more"
      />

      <Section bgColor="bg-body-bg" padding="md">
        <Container>
          <KidsProducts category="casual" title="Casual"/>
        </Container>
      </Section>

      <Section bgColor="bg-body-bg" padding="md">
        <Container>
          <KidsProducts category="trending" title="Kids's Trending"/>
        </Container>
      </Section>
    </>
  )
};
