export type StoreType =
  | "quan_1"
  | "quan_2"
  | "quan_3"
  | "quan_4"
  | "quan_5"
  | "quan_6"
  | "quan_7"
  | "quan_10"
  | "quan_11"
  | "binh_thanh";

export const Store: {
  [key in StoreType]: { label: string; address: string; phone_number: string };
} = {
  quan_1: {
    label: "TnTon Premium Quận 1",
    address: "20 Cao Bá Nhạ, Phường Nguyễn Cư Trinh, Quận 1, TP Hồ Chí Minh.",
    phone_number: "0931823614",
  },
  quan_2: {
    label: "TnTon Quận 2",
    address: "254 Nguyễn Hoàng, phường An Phú, Quận 2, TP Hồ Chí Minh.",
    phone_number: "0937441822",
  },
  quan_3: {
    label: "TnTon Quận 3",
    address: "218 Lý Thái Tổ Phường 1, Quận 3, TP Hồ Chí Minh.",
    phone_number: "phone_number 5",
  },
  quan_4: {
    label: "TnTon Quận 4",
    address:
      "Số 400 Đường Hoàng Diệu, Phường 2, Quận 4, Thành phố Hồ Chí Minh.",
    phone_number: "070 770 7886",
  },
  quan_5: {
    label: "TnTon Quận 5",
    address: "19 Tân Hưng, Phường 12, Quận 5, Thành phố Hồ Chí Minh.",
    phone_number: "0903 178 483",
  },
  quan_6: {
    label: "TnTon Quận 6",
    address: "129 Kinh Dương Vương, Phường 12, Quận 6, Thành phố Hồ Chí Minh.",
    phone_number: "0935267926",
  },
  quan_7: {
    label: "TnTon Quận 7",
    address: "39 đường 65, Phường Tân Phong, Quận 7, Thành phố Hồ Chí Minh.",
    phone_number: "0899793965",
  },
  quan_10: {
    label: "TnTon Quận 10",
    address: "198 Hòa Hưng, Phường 13, Quận 10, Thành phố Hồ Chí Minh.",
    phone_number: "0932 610 008",
  },
  quan_11: {
    label: "TnTon Quận 11",
    address: "209 Âu Cơ, Phường 5, quận 11, TP Hồ Chí Minh.",
    phone_number: "0828333323",
  },
  binh_thanh: {
    label: "TnTon Bình Thạnh",
    address: "284 Xô Viết Nghệ Tĩnh, P21, Quận Bình Thạnh, TP Hồ Chí Minh.",
    phone_number: "0862527179",
  },
};

export const stores = Object.keys(Store).map((key) => ({
  type: key as StoreType,
  label: Store[key as StoreType].label,
  address: Store[key as StoreType].address,
  phone_number: Store[key as StoreType].phone_number,
}));
