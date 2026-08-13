import type { Route } from "./+types/home";
import CategorySection from "../components/CategorySection";
import HeroSlider from "../components/HeroSlider";
import EverydayElegance from "../components/EverydayElegance";
import ProductVideoSlider from "../components/ProductVideoSlider";
import DressesSection from "../components/DressesSection";
import ReviewsSection from "../components/ReviewsSection";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "LOGO | TEXT..." },
    {
      name: "description",
      content: "Explore the latest LOGO  fashion collections.",
    },
  ];
}

export default function Home() {
  return (
    <>
      <CategorySection />

      <HeroSlider />

      <EverydayElegance />

      <ProductVideoSlider />

      <DressesSection />

      <ReviewsSection />
    </>
  );
}