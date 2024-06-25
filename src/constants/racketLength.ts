export type RacketLengthType = "665" | "670" | "675";

export const RacketLength: { [key in RacketLengthType]: { label: string } } = {
  "665": { label: "665 mm" },
  "670": { label: "670 mm" },
  "675": { label: "675 mm" },
};

export const racketLengths = Object.keys(RacketLength).map((key) => ({
  type: key as RacketLengthType,
  label: RacketLength[key as RacketLengthType].label,
}));
