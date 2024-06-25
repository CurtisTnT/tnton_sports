export type BalanceType =
  | "nhe_dau"
  | "can_bang"
  | "hoi_nang_dau"
  | "nang_dau"
  | "sieu_nang_dau";

export const Balance: { [key in BalanceType]: { label: string } } = {
  nhe_dau: { label: "Nhẹ Đầu" },
  can_bang: { label: "Cân Bằng" },
  hoi_nang_dau: { label: "Hơi Nặng Đầu" },
  nang_dau: { label: "Nặng Đầu" },
  sieu_nang_dau: { label: "Siêu Nặng Đầu" },
};

export const balances = Object.keys(Balance).map((key) => ({
  type: key as BalanceType,
  label: Balance[key as BalanceType].label,
}));
