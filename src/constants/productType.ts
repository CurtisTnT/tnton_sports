export type ProductTypeType = "racket" | "shoes" | "shirt" | "pants" | "dress";

export const ProductType: { [key in ProductTypeType]: { label: string } } = {
  racket: { label: "Vợt cầu lông" },
  shoes: { label: "Giày cầu lông" },
  shirt: { label: "Áo cầu lông" },
  pants: { label: "Quần cầu lông" },
  dress: { label: "Váy cầu lông" },
};

export const productTypes = Object.keys(ProductType).map((key) => ({
  type: key as ProductTypeType,
  label: ProductType[key as ProductTypeType].label,
}));
