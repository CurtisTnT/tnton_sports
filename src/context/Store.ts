import { Product } from "./../services/interface";
import { Dispatch, createContext, useContext } from "react";

export type AppState = {
  user: { id: number; name: string; email: string; token: string };
  favoriteItems: Product[];
  cartItems: Product[];
};

export const initialAppState = {
  user: { id: 0, name: "", email: "", token: "" },
  favoriteItems: [],
  cartItems: [],
};

export const StoreContext = createContext<
  [appState: AppState, setAppState: Dispatch<React.SetStateAction<AppState>>]
>([initialAppState, () => undefined]);

export const useStore = () => useContext(StoreContext);
