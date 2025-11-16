import React, { createContext, useState, type ReactNode } from "react";
import type {
  CartProduct,
  Filters,
  Products,
  ProductsContextType,
} from "./types";
import axios from "axios";

export const ProductsContext = createContext<ProductsContextType | null>(null);

const ProductsProvider: React.FC<{ children: ReactNode | null }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Products[]>([]);
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [filters, setFilters] = useState<Filters>({
    category: [],
    price: [],
    searchQuery: "",
    sortBy: null,
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(undefined);

      const { data } = await axios.get<Products[]>(
        "https://fakestoreapi.com/products"
      );
      setProducts(data);
      setFilteredProducts(data);

      const uniqueCategories = [...new Set(data.map((p) => p.category))];
      setCategories(uniqueCategories);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch products");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    products,
    filteredProducts,
    categories,
    loading,
    error,
    filters,
    setFilters,
    fetchProducts,
    setFilteredProducts,
    cart,
    setCart,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
