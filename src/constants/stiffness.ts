export type StiffnessType = "deo" | "trung_binh" | "cung" | "sieu_cung";

export const Stiffness: { [key in StiffnessType]: { label: string } } = {
  deo: { label: "Dẻo" },
  trung_binh: { label: "Trung Bình" },
  cung: { label: "Cứng" },
  sieu_cung: { label: "Siêu Cứng" },
};

export const stiffness = Object.keys(Stiffness).map((key) => ({
  type: key as StiffnessType,
  label: Stiffness[key as StiffnessType].label,
}));
