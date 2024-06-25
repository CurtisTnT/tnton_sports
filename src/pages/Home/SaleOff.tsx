import { Link } from "react-router-dom";

import ContentContainer from "@/components/layouts/ContentContainer";
import HomeTitle from "@/components/titles/HomeTitle";
import item1 from "@/assets/images/sale-off-item-1.webp";
import item2 from "@/assets/images/sale-off-item-2.webp";
import item3 from "@/assets/images/sale-off-item-3.webp";

export default function SaleOff() {
  const SALE_OFF_ITEMS = [
    {
      id: 1,
      imageUrl: item1,
      to: "/sale-off/rackets-shoes?product_type=racket",
    },
    {
      id: 2,
      imageUrl: item2,
      to: "/sale-off/rackets-shoes?product_type=shoes",
    },
    {
      id: 3,
      imageUrl: item3,
      to: "/sale-off/clothes",
    },
  ];

  return (
    <ContentContainer>
      <HomeTitle title="SALE OFF" />

      <div className="grid grid-cols-3 gap-4">
        {SALE_OFF_ITEMS.map(({ id, imageUrl, to }) => (
          <Link
            key={id}
            to={to}
            className="col-span-1 rounded overflow-hidden hover:scale-105 duration-300"
          >
            <img
              src={imageUrl}
              alt="sale-off"
              height={155}
              className="h-[155px]"
            />
          </Link>
        ))}
      </div>
    </ContentContainer>
  );
}
