import React from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCreditCard } from "react-icons/fa6";
import { MdCurrencyExchange } from "react-icons/md";

import ContentContainer from "@/components/layouts/ContentContainer";

type Criterion = { id: number; icon: React.ReactNode; label: React.ReactNode };

export default function Criteria() {
  const CRITERIA_ITEMS: Criterion[] = [
    {
      id: 1,
      icon: <TbTruckDelivery size={25} className="shrink-0" />,
      label: (
        <p>
          Vận chuyển <b>toàn quốc</b>
        </p>
      ),
    },
    {
      id: 2,
      icon: <AiOutlineLike size={24} className="shrink-0" />,
      label: (
        <p>
          Đảm bảo <b>chất lượng</b>
        </p>
      ),
    },
    {
      id: 3,
      icon: <FaRegCreditCard size={20} className="shrink-0" />,
      label: (
        <p>
          Nhiều phương thức <b>thanh toán</b>
        </p>
      ),
    },
    {
      id: 4,
      icon: <MdCurrencyExchange size={20} className="shrink-0" />,
      label: (
        <p>
          Đổi trả <b>miễn phí</b>
        </p>
      ),
    },
  ];

  const renderSmallCard = (item: Criterion) => {
    const { id, icon, label } = item;
    return (
      <div key={id} className="col-span-1 place-content-center flex items-center gap-2 border border-black-light/30 rounded-lg px-2 py-4 text-pink">
        {icon}
        {label}
      </div>
    );
  };

  return (
    <ContentContainer>
      <div className="grid grid-cols-4 gap-4">
        {CRITERIA_ITEMS.map(renderSmallCard)}
      </div>
    </ContentContainer>
  );
}
