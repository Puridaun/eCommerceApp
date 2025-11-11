import React, { createContext, useState, type ReactNode } from "react";
import type { Filters, Products } from "./types";
import axios from "axios";

interface ProductsContextType {
  products: Products[];
  fetchProducts: () => {};
  loading: boolean;
  error: string;
}

export const ProductsContext = createContext<ProductsContextType | null>(null);

const ProductsProvider: React.FC<{ children: ReactNode | null }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Products[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({
    category: null,
    minPrice: null,
    maxPrice: null,
    searchQuery: "",
    sortBy: null,
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get<Products[]>(
        "https://fakestoreapi.com/products"
      );
      setProducts(response.data);
      setFilteredProducts(response.data);

      const uniqueCategories = [
        ...new Set(response.data.map((p) => p.category)),
      ];
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
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
