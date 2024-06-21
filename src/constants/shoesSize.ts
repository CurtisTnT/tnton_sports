export type ShoesSizeType =
  | "36"
  | "37"
  | "38"
  | "39"
  | "40"
  | "41"
  | "42"
  | "43"
  | "44"
  | "45";

export const ShoesSize: { [key in ShoesSizeType]: { label: string } } = {
  "36": { label: "36" },
  "37": { label: "37" },
  "38": { label: "38" },
  "39": { label: "39" },
  "40": { label: "40" },
  "41": { label: "41" },
  "42": { label: "42" },
  "43": { label: "43" },
  "44": { label: "44" },
  "45": { label: "45" },
};

export const shoesSizes = Object.keys(ShoesSize).map((key) => ({
  type: key as ShoesSizeType,
  label: ShoesSize[key as ShoesSizeType].label,
}));
