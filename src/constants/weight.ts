export type WeightType = "2u" | "3u" | "4u" | "5u" | "f" | "2f";

export const Weight: { [key in WeightType]: { label: string } } = {
  "2u": { label: "2U: 90 - 94g" },
  "3u": { label: "3U: 85 - 89g" },
  "4u": { label: "4U: 80 - 84g" },
  "5u": { label: "5U: 75 - 79g" },
  f: { label: "F: 70 - 74g" },
  "2f": { label: "2F: 65 - 69g" },
};

export const weights = Object.keys(Weight).map((key) => ({
  type: key as WeightType,
  label: Weight[key as WeightType].label,
}));
