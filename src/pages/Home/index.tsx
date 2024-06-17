import IntroCarousel from "./IntroCarousel.tsx";
import VideoIntro from "./VideoIntro.tsx";
import Criteria from "./Criteria.tsx";
import NewProducts from "./NewProducts.tsx";
import SaleOff from "./SaleOff.tsx";
import AllProducts from "./AllProducts.tsx";
import News from "./News.tsx";

export default function Home() {
  return (
    <div className="">
      <VideoIntro />
      <IntroCarousel />
      <Criteria />
      <NewProducts />
      <SaleOff />
      <AllProducts />
      <News />
    </div>
  );
}
