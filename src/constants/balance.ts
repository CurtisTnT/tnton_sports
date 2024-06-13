export type Balance = {
  type: string;
  label: string;
};

export const balances: Balance[] = [
  {
    type: "nhe_dau",
    label: "Nhẹ Đầu",
  },
  {
    type: "can_bang",
    label: "Cân Bằng",
  },
  {
    type: "hoi_nang_dau",
    label: "Hơi Nặng Đầu",
  },
  {
    type: "nang_dau",
    label: "Nặng Đầu",
  },
  {
    type: "sieu_nang_dau",
    label: "Siêu Nặng Đầu",
  },
];
