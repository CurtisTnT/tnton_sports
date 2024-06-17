import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import HomeTitle from "@/components/titles/HomeTitle";
import prodCarousel1 from "@/assets/images/prodCarousel1.webp";
import prodCarousel2 from "@/assets/images/prodCarousel2.webp";
import prodCarousel3 from "@/assets/images/prodCarousel3.webp";
import prodCarousel4 from "@/assets/images/prodCarousel4.webp";

export default function IntroCarousel() {
  return (
    <section>
      <HomeTitle title="LET'S SHOPPING" />

      <Swiper
        centeredSlides={true}
        autoplay={{
          delay: 3000,
        }}
        loop
        speed={1500}
        modules={[Autoplay]}
      >
        <SwiperSlide>
          <img
            src={prodCarousel1}
            alt="prodImg"
            height={640}
            className="h-[640px]"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src={prodCarousel2}
            alt="prodImg"
            height={640}
            className="h-[640px] w-full"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src={prodCarousel3}
            alt="prodImg"
            height={640}
            className="h-[640px] w-full"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src={prodCarousel4}
            alt="prodImg"
            height={640}
            className="h-[640px] w-full"
          />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
