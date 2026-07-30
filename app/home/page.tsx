import Hero from "@/component/Hero";
import MenProducts from "@/component/men/MenProducts";
import WomenProducts from "@/component/women/WomenProducts";
import KidsProducts from "@/component/kids/KidsProducts";
import Explore from "@/component/Explore";
import Section from "@/component/Section";
import Container from "@/component/Container";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Section bgColor="bg-white" padding="sm">
        <Hero />
      </Section>

      {/* Men's Collection Section */}
      <Section bgColor="bg-com-bg" padding="md">
        <Container>
          <MenProducts
            category="latest"
            limit={4}
            title="Men's Latest Collection"
            description="Discover the latest trends in men's fashion. Explore our carefully curated collection of premium blazers, suits, and jackets designed for the modern man."
          />
        </Container>
      </Section>

      {/* Women's Collection Section */}
      <Section bgColor="bg-white" padding="md">
        <Container>
          <WomenProducts
            title="Women's Latest Collection"
            limit={4}
            description="Explore the latest trends in women's fashion. Discover our carefully curated collection of premium elegant dresses, classic blouses, and stylish cardigans designed for the modern woman."
          />
        </Container>
      </Section>

      {/* Kids Collection Section */}
      <Section bgColor="bg-com-bg" padding="md">
        <Container>
          <KidsProducts
            title="Kids Latest Collection"
            limit={4}
            description="Explore the latest trends in kids' fashion. Discover our carefully curated collection of deluxe kids' jackets, special kids' dresses, and stylish cardigans designed for modern kids."
          />
        </Container>
      </Section>

      {/* Explore Section */}
      <Explore />
    </>
  );
}