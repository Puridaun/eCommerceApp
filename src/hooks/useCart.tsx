import { useContext } from "react";
import { CartProductsContext } from "../context/CartProductsContext";

export const useCart = () => {
  const context = useContext(CartProductsContext);

  if (!context) {
    throw new Error("useProduct must be used within an CartProductsProvider");
  }

  return context;
};
