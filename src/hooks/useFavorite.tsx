import { useContext } from "react";
import { FavoriteProductsContext } from "../context/FavoriteProductsContext";

export const useFavorite = () => {
  const context = useContext(FavoriteProductsContext);

  if (!context) {
    throw new Error(
      "useFavorite must be used within an FavoriteProductsProvider"
    );
  }
  return context;
};
