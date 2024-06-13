export type ShoesForm = {
  type: string;
  label: string;
};

export const shoesForms: ShoesForm[] = [
  {
    type: "slim",
    label: "Slim - Bàn chân thon",
  },
  {
    type: "unisex",
    label: "Unisex - Bàn chân thường",
  },
  {
    type: "wide",
    label: "Wide - Bàn chân bè",
  },
];
