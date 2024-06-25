export type ShoesFormType = "slim" | "unisex" | "wide";

export const ShoesForm: { [key in ShoesFormType]: { label: string } } = {
  slim: { label: "Slim - Bàn chân thon" },
  unisex: { label: "Unisex - Bàn chân thường" },
  wide: { label: "Wide - Bàn chân bè" },
};

export const shoesForms = Object.keys(ShoesForm).map((key) => ({
  type: key as ShoesFormType,
  label: ShoesForm[key as ShoesFormType].label,
}));
