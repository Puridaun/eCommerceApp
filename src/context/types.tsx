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

export type Products = {
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

export type Filters = {
  category: string[];
  price: string[];
  searchQuery: "";
  sortBy: null;
};

export type CartProduct = {
  cartProduct: Products | null;
  quantity: number;
};
export interface ProductsContextType {
  products: Products[];
  filteredProducts: Products[];
  categories: string[];
  loading: boolean;
  error: string | undefined;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  setFilteredProducts: React.Dispatch<React.SetStateAction<Products[]>>;
  fetchProducts: () => Promise<void>;
  cart: CartProduct[];
  setCart: React.Dispatch<React.SetStateAction<CartProduct[]>>;
}
