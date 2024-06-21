export type BrandType = "yonex" | "lining" | "victor" | "kumpoo" | "mizuno";

export const Brand: { [key in BrandType]: { label: string } } = {
  yonex: { label: "Yonex" },
  lining: { label: "Lining" },
  victor: { label: "Victor" },
  kumpoo: { label: "Kumpoo" },
  mizuno: { label: "Mizuno" },
};

export const brands = Object.keys(Brand).map((key) => ({
  type: key as BrandType,
  label: Brand[key as BrandType].label,
}));
