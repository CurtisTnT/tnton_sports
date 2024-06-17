import apiClient from "@/lib/apiClient";
import { Clothes, RacketShoes } from "./interface";

export const getRacketsAndShoes = async (
  params?: Partial<RacketShoes>
): Promise<RacketShoes[] | undefined> => {
  try {
    const res = await apiClient.get("/rackets_shoes", { params });

    return res.data;
  } catch (error: any) {
    console.log(new Error(error));
  }
};

export const getClothes = async (
  params?: Partial<Clothes>
): Promise<Clothes[] | undefined> => {
  try {
    const res = await apiClient.get("/clothes", { params });

    return res.data;
  } catch (error: any) {
    console.log(new Error(error));
  }
};
