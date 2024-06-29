import { apiClient1 } from "@/lib/apiClient";
import { Clothes, ProductParams, RacketShoes } from "./interface";
import { initialClothes, initialRacketShoes } from "./initialState";

export const getRacketsAndShoes = async (
  params?: ProductParams
): Promise<RacketShoes[]> => {
  try {
    const res = await apiClient1.get("/rackets_shoes", { params });

    return res.data;
  } catch (error: any) {
    console.log(new Error(error));
    return [];
  }
};

export const getDetailRacketAndShoes = async (args: {
  productId: number;
}): Promise<RacketShoes> => {
  try {
    const res = await apiClient1.get(`/rackets_shoes/${args.productId}`);

    return res.data;
  } catch (error: any) {
    console.log(new Error(error));
    return initialRacketShoes;
  }
};

export const getClothes = async (
  params?: ProductParams
): Promise<Clothes[]> => {
  try {
    const res = await apiClient1.get("/clothes", { params });

    return res.data;
  } catch (error: any) {
    console.log(new Error(error));
    return [];
  }
};

export const getDetailClothes = async (args: {
  productId: number;
}): Promise<Clothes> => {
  try {
    const res = await apiClient1.get(`/clothes/${args.productId}`);

    return res.data;
  } catch (error: any) {
    console.log(new Error(error));
    return initialClothes;
  }
};
