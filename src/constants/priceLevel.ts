export type PriceLevelType = "<0.5" | "0.5_1" | "1_2" | "2_3" | ">3";

export const PriceLevel: { [key in PriceLevelType]: { label: string } } = {
  "<0.5": { label: "Giá dưới 500.000đ" },
  "0.5_1": { label: "500.000đ - 1 triệu" },
  "1_2": { label: "1 - 2 triệu" },
  "2_3": { label: "2 - 3 triệu" },
  ">3": { label: "Giá trên 3 triệu" },
};

export const priceLevels = Object.keys(PriceLevel).map((key) => ({
  type: key as PriceLevelType,
  label: PriceLevel[key as PriceLevelType].label,
}));
