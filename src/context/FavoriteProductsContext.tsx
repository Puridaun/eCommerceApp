import React, {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { FavoriteProductsInterface, ProductsType } from "./types";

export const FavoriteProductsContext =
  createContext<FavoriteProductsInterface | null>(null);

const FavoriteProductsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favoriteProducts, setFavoriteProducts] = useState<ProductsType[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    const savedFavorite = localStorage.getItem("favorite_products");
    if (savedFavorite) {
      try {
        setFavoriteProducts(JSON.parse(savedFavorite));
        console.log("Favorite loaded from localStorage");
      } catch (err) {
        console.error("Failed to parse favorite:", err);
      }
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(
        "favorite_products",
        JSON.stringify(favoriteProducts)
      );
    }
  }, [favoriteProducts, isHydrated]);

  const addToFavorite = (product: ProductsType) => {
    const isAlreadyInFavorites = favoriteProducts.some(
      (item) => item.id === product.id
    );

    if (!isAlreadyInFavorites) {
      setFavoriteProducts((prev) => [...prev, product]);
    } else removeFromFavorite(product);
  };

  const removeFromFavorite = (product: ProductsType) => {
    setFavoriteProducts((prev) =>
      prev.filter((item) => item.id !== product.id)
    );
  };

  const clearFavorite = () => {
    setFavoriteProducts([]);
  };

  const favoriteTotal = favoriteProducts.length;
  const value: FavoriteProductsInterface = {
    favoriteProducts,
    setFavoriteProducts,
    addToFavorite,
    removeFromFavorite,
    clearFavorite,
    favoriteTotal,
  };
  return (
    <FavoriteProductsContext.Provider value={value}>
      {children}
    </FavoriteProductsContext.Provider>
  );
};

export default FavoriteProductsProvider;
