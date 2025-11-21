import type { User } from "@supabase/supabase-js";

export interface AuthProviderType {
  user: User | null;
  signUp: (
    email: string,
    password: string,
    fullName?: string
  ) => Promise<{ data: any; error: any }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ data: any; error: any }>;
  signOut: () => Promise<{ error: any }>;
  resetPassword: (email: string) => Promise<{ data: any; error: any }>;
  loading: boolean;
}

export type ProductsType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export type FiltersType = {
  category: string[];
  price: string[];
  searchQuery: "";
  sortBy: null;
};

export type CartProductType = {
  cartProduct: ProductsType;
  quantity: number;
};

export interface ProductsContextInterface {
  products: ProductsType[];
  filteredProducts: ProductsType[];
  categories: string[];
  loading: boolean;
  error: string | undefined;
  filters: FiltersType;
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
  setFilteredProducts: React.Dispatch<React.SetStateAction<ProductsType[]>>;
  fetchProducts: () => Promise<void>;
  cartProducts: CartProductType[];
  setCartProducts: React.Dispatch<React.SetStateAction<CartProductType[]>>;
  favoriteProducts: ProductsType[];
  setFavoriteProducts: React.Dispatch<React.SetStateAction<ProductsType[]>>;
}

export interface CartProductsInterface {
  cartProducts: CartProductType[];
  setCartProducts: React.Dispatch<React.SetStateAction<CartProductType[]>>;
  addToCart: (product: ProductsType, quantity: number) => void;
  removeFromCart: (product: ProductsType) => void;
  updateQuantity: (product: ProductsType, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
}
