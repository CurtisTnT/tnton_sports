import ProductsCarousel from "./ProductsCarousel.tsx";
import VideoIntro from "./VideoIntro.tsx";
import Criteria from "./Criteria.tsx";

export default function Home() {
  return (
    <div className="">
      <VideoIntro />
      <ProductsCarousel />
      <Criteria />
    </div>
  );
}
