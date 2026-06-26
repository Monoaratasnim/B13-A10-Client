import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturedEbooks from "@/components/FeaturedEbooks";
import TopWriters from "@/components/TopWriters";
import GenreSection from "@/components/GenreSection";


export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedEbooks />
      <TopWriters />
      <GenreSection />
      <Footer />
    </>
  );
}