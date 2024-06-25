import { Link } from "react-router-dom";

import ContentContainer from "@/components/layouts/ContentContainer";
import HomeTitle from "@/components/titles/HomeTitle";
import shirtImg from "@/assets/images/shirt.webp";
import shoesImg from "@/assets/images/shoes.webp";
import dressImg from "@/assets/images/dress.webp";
import racketImg from "@/assets/images/racket.webp";
import pantsImg from "@/assets/images/pants.webp";

export default function AllProducts() {
  const PRODUCT_TYPE_ITEMS = [
    {
      id: 1,
      label: "Vợt cầu lông",
      imageUrl: racketImg,
      to: "/products/rackets",
    },
    {
      id: 2,
      label: "Giày cầu lông",
      imageUrl: shoesImg,
      to: "/products/shoes",
    },
    {
      id: 3,
      label: "Áo cầu lông",
      imageUrl: shirtImg,
      to: "/products/shirts",
    },
    {
      id: 4,
      label: "Quần cầu lông",
      imageUrl: pantsImg,
      to: "/products/pants",
    },
    {
      id: 5,
      label: "Váy cầu lông",
      imageUrl: dressImg,
      to: "/products/dresses",
    },
  ];

  return (
    <ContentContainer>
      <HomeTitle title="ALL PRODUCTS" />

      <div className="space-y-5">
        <div className="flex justify-center gap-5">
          {PRODUCT_TYPE_ITEMS.slice(0, 2).map(({ id, label, imageUrl, to }) => (
            <Link
              key={id}
              to={to}
              className="relative w-[350px] h-[350px] rounded overflow-hidden group after:absolute after:inset-0 after:bg-white/50 after:opacity-0 hover:after:opacity-100 after:duration-300 after:z-0"
            >
              <img
                src={imageUrl}
                alt="prod-img"
                width={350}
                height={350}
                className="scale-110 group-hover:scale-100 duration-300"
              />

              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-10 mx-4 py-2 bg-pink -skew-y-[8deg] scale-[85%] group-hover:scale-100 duration-300">
                <p className="text-center text-white text-2xl uppercase font-medium ">
                  {label}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center gap-5">
          {PRODUCT_TYPE_ITEMS.slice(2, 5).map(({ id, label, imageUrl, to }) => (
            <Link
              key={id}
              to={to}
              className="relative w-[350px] h-[350px] rounded overflow-hidden group after:absolute after:inset-0 after:bg-white/50 after:opacity-0 hover:after:opacity-100 after:duration-300 after:z-0"
            >
              <img
                src={imageUrl}
                alt="prod-img"
                width={350}
                height={350}
                className="scale-110 group-hover:scale-100 duration-300"
              />

              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-10 mx-4 py-2 bg-pink -skew-y-[8deg] scale-[85%] group-hover:scale-100 duration-300">
                <p className="text-center text-white text-2xl uppercase font-medium ">
                  {label}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </ContentContainer>
  );
}
