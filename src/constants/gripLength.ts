export type GripLengthType = "200" | "205" | "210";

export const GripLength: { [key in GripLengthType]: { label: string } } = {
  "200": { label: "200 mm" },
  "205": { label: "205 mm" },
  "210": { label: "210 mm" },
};

export const gripLengths = Object.keys(GripLength).map((key) => ({
  type: key as GripLengthType,
  label: GripLength[key as GripLengthType].label,
}));
