import apiClient from "@/lib/apiClient";
import { Clothes, ProductParams, RacketShoes } from "./interface";

export const getRacketsAndShoes = async (
  params?: ProductParams
): Promise<RacketShoes[]> => {
  try {
    const res = await apiClient.get("/rackets_shoes", { params });

    return res.data;
  } catch (error: any) {
    console.log(new Error(error));
    return [];
  }
};

export const getClothes = async (
  params?: Partial<Clothes> & { page?: number; limit?: number }
): Promise<Clothes[] | undefined> => {
  try {
    const res = await apiClient.get("/clothes", { params });

    return res.data;
  } catch (error: any) {
    console.log(new Error(error));
  }
};
