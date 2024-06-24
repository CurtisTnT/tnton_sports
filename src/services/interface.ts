import { BrandType } from "@/constants/brand";
import { ClothesSizeType } from "@/constants/clothesSize";
import { ProductType } from "@/constants/productType";

export interface RacketShoes {
  id: number;
  name: string;
  image_url: string[];
  price: number;
  init_price: number;
  isNew: boolean;
  discount_percent: number;
  is_discount: boolean;
  stores: string[];
  price_level: string;
  brand: BrandType | null;
  subject: string;
  shoes_size: string[];
  hight_light: string;
  shoes_form: string;
  racket_length: string;
  grip_length: string;
  swing_weight: string;
  weight: string;
  balance: string;
  stiffness: string;
  product_type: "racket" | "shoes" | null;
}

export interface Clothes {
  id: number;
  name: string;
  image_url: string[];
  price: number;
  init_price: number;
  isNew: boolean;
  discount_percent: number;
  is_discount: boolean;
  stores: string[];
  brand: BrandType | null;
  clothes_sizes: ClothesSizeType[];
  subject: string;
  product_type: "shirt" | "pants" | "dress" | null;
}

export interface Products {
  racketsShoes: RacketShoes[];
  clothes: Clothes[];
}

export type Product = Omit<Clothes, "clothes_sizes" | "product_type"> & {
  clothes_sizes?: ClothesSizeType[];
  shoes_size?: string[];
  hight_light?: string;
  shoes_form?: string;
  racket_length?: string;
  grip_length?: string;
  swing_weight?: string;
  weight?: string;
  balance?: string;
  stiffness?: string;
  price_level?: string;
  product_type: ProductType | null;
};

export interface News {
  id: string;
  title: string;
  date: string;
  description: string;
  image_url: string;
  link_url: string;
}

export interface ProductParams {
  page?: number;
  limit?: number;
  name?: string;
  image_url?: string;
  price?: string;
  init_price?: string;
  isNew?: boolean;
  discount_percent?: string;
  is_discount?: boolean;
  stores?: string;
  price_level?: string;
  brand?: string;
  shoes_size?: string;
  subject?: string;
  hight_light?: string;
  shoes_form?: string;
  racket_length?: string;
  grip_length?: string;
  swing_weight?: string;
  weight?: string;
  balance?: string;
  stiffness?: string;
  product_type?: string;
  clothes_sizes?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}
