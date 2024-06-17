export interface RacketShoes {
  id: number;
  name: string;
  image_url: string[];
  price: number;
  init_price: number;
  isNew: boolean;
  discount_percent: number;
  stores: string[];
  price_level: string;
  brand: string;
  shoes_size: string[];
  subject: string;
  hight_light: string;
  shoes_form: string;
  racket_length: string;
  grip_length: string;
  swing_weight: string;
  weight: string;
  balance: string;
  stiffness: string;
  product_type: string;
}

export interface Clothes {
  id: number;
  name: string;
  image_url: string[];
  price: number;
  init_price: number;
  isNew: boolean;
  discount_percent: number;
  stores: string[];
  brand: string;
  clothes_sizes: string[];
  subject: string;
  product_type: string;
}

export interface Products {
  racketsShoes: RacketShoes[];
  clothes: Clothes[];
}
