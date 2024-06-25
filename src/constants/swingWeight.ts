export type SwingWeightType = "<82" | "82_84" | "84_86" | "86_88" | ">88";

export const SwingWeight: { [key in SwingWeightType]: { label: string } } = {
  "<82": { label: "Dưới 82 kg/cm2" },
  "82_84": { label: "82-84 kg/cm2" },
  "84_86": { label: "84-86 kg/cm2" },
  "86_88": { label: "86-88 kg/cm2" },
  ">88": { label: "Trên 88 kg/cm2" },
};

export const swingWeights = Object.keys(SwingWeight).map((key) => ({
  type: key as SwingWeightType,
  label: SwingWeight[key as SwingWeightType].label,
}));
