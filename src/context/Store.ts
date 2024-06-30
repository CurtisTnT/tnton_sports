import { initialUser } from "@/services/initialState";
import { Clothes, RacketShoes, User } from "@/services/interface";
import { Dispatch, createContext, useContext } from "react";

export type AppState = {
  user: User;
  isFavoriteModalOpen: boolean;
  isCartModalOpen: boolean;
  isSearchModalOpen: boolean;
  racketsAndShoes: RacketShoes[];
  clothes: Clothes[];
};

export const initialAppState: AppState = {
  user: initialUser,
  isFavoriteModalOpen: false,
  isCartModalOpen: false,
  isSearchModalOpen: false,
  racketsAndShoes: [],
  clothes: [],
};

export const StoreContext = createContext<{
  appState: AppState;
  setAppState: Dispatch<React.SetStateAction<AppState>>;
}>({ appState: initialAppState, setAppState: () => undefined });

export const useStore = () => useContext(StoreContext);
