export type PriceLevel = {
  type: string;
  label: string;
};

export const priceLevels: PriceLevel[] = [
  {
    type: "<0.5",
    label: "Giá dưới 500.000đ",
  },
  {
    type: "0.5_1",
    label: "500.000đ - 1 triệu",
  },
  {
    type: "1_2",
    label: "1 - 2 triệu",
  },
  {
    type: "2_3",
    label: "2 - 3 triệu",
  },
  {
    type: ">3",
    label: "Giá trên 3 triệu",
  },
];
