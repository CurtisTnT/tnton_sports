export type HighLightType = "toan_dien" | "sieu_nhe" | "on_dinh" | "em_ai";

export const HighLight: { [key in HighLightType]: { label: string } } = {
  toan_dien: { label: "Toàn diện" },
  sieu_nhe: { label: "Siêu nhẹ" },
  on_dinh: { label: "Ổn định" },
  em_ai: { label: "Êm ái" },
};

export const highLights = Object.keys(HighLight).map((key) => ({
  type: key as HighLightType,
  label: HighLight[key as HighLightType].label,
}));
