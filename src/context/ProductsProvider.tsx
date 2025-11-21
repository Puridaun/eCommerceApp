import axios from "axios";
import React, {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type {
  CartProductType,
  FiltersType,
  ProductsType,
  ProductsContextInterface,
} from "./types";

export const ProductsContext = createContext<ProductsContextInterface | null>(
  null
);

const ProductsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [cartProducts, setCartProducts] = useState<CartProductType[]>([]);
  const [favoriteProducts, setFavoriteProducts] = useState<ProductsType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductsType[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [filters, setFilters] = useState<FiltersType>({
    category: [],
    price: [],
    searchQuery: "",
    sortBy: null,
  });

  useEffect(() => {
    const savedFilters = localStorage.getItem("ecommerce_filters");
    if (savedFilters) {
      try {
        setFilters(JSON.parse(savedFilters));
        console.log("Filters loaded from localStorage");
      } catch (err) {
        console.error("Failed to parse filters:", err);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ecommerce_filters", JSON.stringify(filters));
    console.log("Filters saved to localStorage");
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(undefined);

      const { data } = await axios.get<ProductsType[]>(
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
    cartProducts,
    setCartProducts,
    setFavoriteProducts,
    favoriteProducts,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
