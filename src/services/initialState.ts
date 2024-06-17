import { Clothes, Products, RacketShoes } from "./interface";

export const initialRacketShoes: RacketShoes = {
  id: 0,
  name: "",
  image_url: [],
  price: 0,
  init_price: 0,
  isNew: false,
  discount_percent: 0,
  stores: [],
  price_level: "",
  brand: "",
  shoes_size: [],
  subject: "",
  hight_light: "",
  shoes_form: "",
  racket_length: "",
  grip_length: "",
  swing_weight: "",
  weight: "",
  balance: "",
  stiffness: "",
  product_type: "",
};

export const initialClothes: Clothes = {
  id: 0,
  name: "",
  image_url: [],
  price: 0,
  init_price: 0,
  isNew: false,
  discount_percent: 0,
  stores: [],
  brand: "",
  clothes_sizes: [],
  subject: "",
  product_type: "",
};

export const initialProducts: Products = {
  racketsShoes: [],
  clothes: [],
};
