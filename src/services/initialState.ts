import { Clothes, Product, Products, RacketShoes, User } from "./interface";

export const initialRacketShoes: RacketShoes = {
  id: 0,
  name: "",
  image_url: [],
  price: 0,
  init_price: 0,
  isNew: false,
  discount_percent: 0,
  is_discount: false,
  stores: [],
  price_level: "",
  brand: null,
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
  product_type: null,
};

export const initialClothes: Clothes = {
  id: 0,
  name: "",
  image_url: [],
  price: 0,
  init_price: 0,
  isNew: false,
  discount_percent: 0,
  is_discount: false,
  stores: [],
  brand: null,
  clothes_sizes: [],
  subject: "",
  product_type: null,
};

export const initialProducts: Products = {
  racketsShoes: [],
  clothes: [],
};

export const initialProduct: Product = {
  id: 0,
  name: "",
  image_url: [],
  price: 0,
  init_price: 0,
  isNew: false,
  discount_percent: 0,
  is_discount: false,
  stores: [],
  price_level: "",
  brand: null,
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
  product_type: null,
  clothes_sizes: [],
};

export const initialUser: User = {
  id: 0,
  name: "",
  email: "",
  phone_number: "",
  password: "",
  cart_products: [],
  favorite_products: [],
};
