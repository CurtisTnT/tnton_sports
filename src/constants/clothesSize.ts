export type ClothesSizeType = "s" | "m" | "l" | "xl" | "2xl" | "3xl";

export const ClothesSize: { [key in ClothesSizeType]: { label: string } } = {
  s: { label: "S" },
  m: { label: "M" },
  l: { label: "L" },
  xl: { label: "XL" },
  "2xl": { label: "2XL" },
  "3xl": { label: "3XL" },
};

export const clothesSizes = Object.keys(ClothesSize).map((key) => ({
  type: key as ClothesSizeType,
  label: ClothesSize[key as ClothesSizeType].label,
}));
