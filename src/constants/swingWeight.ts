export type SwingWeight = {
  type: string;
  name: string;
};

export const swingWeights: SwingWeight[] = [
  {
    type: "<82",
    name: "Dưới 82 kg/cm2",
  },
  {
    type: "82_84",
    name: "82-84 kg/cm2",
  },
  {
    type: "84_86",
    name: "84-86 kg/cm2",
  },
  {
    type: "86_88",
    name: "86-88 kg/cm2",
  },
  {
    type: ">88",
    name: "Trên 88 kg/cm2",
  },
];
