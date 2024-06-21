import { useRef, useState } from "react";
import clsx from "clsx";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { formatVndCurrency } from "@/utils/helpers";
import { Clothes, Product, RacketShoes } from "@/services/interface";
import ProductDetailOverlay from "@/components/ProductDetailOverlay";

type Props = {
  products: (RacketShoes | Clothes)[];
  onSelectProduct: (product: Product) => void;
};

export default function HomeProductsCarousel(props: Props) {
  const { products, onSelectProduct } = props;
  const [curIndex, setCurIndex] = useState<number>();

  const swiperRef = useRef<SwiperRef>(null);

  return (
    <div className="relative bg-white-yellow group overflow-hidden min-h-[362px]">
      <button
        onClick={() => swiperRef.current?.swiper.slidePrev()}
        className={clsx(
          "absolute -left-2 top-1/2 -translate-y-1/2 -translate-x-8 duration-300 z-10 disabled:opacity-50 group-hover:translate-x-0"
        )}
        disabled={curIndex === 0}
      >
        <IoIosArrowBack size={40} className="text-pink" />
      </button>

      <Swiper
        ref={swiperRef}
        slidesPerView={5}
        spaceBetween={24}
        className="px-6"
        onSlideChange={(swiper) => setCurIndex(swiper.activeIndex)}
        onInit={(swiper) => setCurIndex(swiper.activeIndex)}
      >
        {products.map((product) => {
          const { name, image_url, price } = product;
          return (
            <SwiperSlide
              key={name}
              className="relative flex flex-col my-6 bg-white h-full py-3 px-0.5 shadow-[0px_0px_10px_1px_rgb(0,0,0,0.3)] rounded overflow-hidden"
            >
              <img
                src={image_url[0]}
                alt="product-image"
                height={210}
                className="h-[210px] my-2 text"
              />
              <p className="text-sm px-3 ellipsis-2-lines">{name}</p>
              <p className="px-3 text-pink font-bold">
                {formatVndCurrency(price)}
              </p>
              <ProductDetailOverlay
                onSeeDetailProduct={() => onSelectProduct(product)}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>

      <button
        onClick={() => swiperRef.current?.swiper.slideNext()}
        className={clsx(
          "absolute -right-2 top-1/2 -translate-y-1/2 translate-x-8 duration-300 z-10 disabled:opacity-50 group-hover:translate-x-0"
        )}
        disabled={curIndex === products.length - 5}
      >
        <IoIosArrowForward size={40} className="text-pink" />
      </button>
    </div>
  );
}
