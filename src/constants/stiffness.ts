export type Stiffness = {
  type: string;
  label: string;
};

export const stiffness: Stiffness[] = [
  {
    type: "deo",
    label: "Dẻo",
  },
  {
    type: "trung_binh",
    label: "Trung Bình",
  },
  {
    type: "cung",
    label: "Cứng",
  },
  {
    type: "sieu_cung",
    label: "Siêu Cứng",
  },
];
