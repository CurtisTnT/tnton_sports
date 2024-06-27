import { Product } from "./../services/interface";
import { Dispatch, createContext, useContext } from "react";

export type AppState = {
  user: { id: number; name: string; email: string; token: string };
  favoriteItems: Product[];
  cartItems: Product[];
  isFavoriteModalOpen: boolean;
  isCartModalOpen: boolean;
};

export const initialAppState: AppState = {
  user: { id: 0, name: "", email: "", token: "" },
  favoriteItems: [],
  cartItems: [],
  isFavoriteModalOpen: false,
  isCartModalOpen: false,
};

export const StoreContext = createContext<{
  appState: AppState;
  setAppState: Dispatch<React.SetStateAction<AppState>>;
}>({ appState: initialAppState, setAppState: () => undefined });

export const useStore = () => useContext(StoreContext);
