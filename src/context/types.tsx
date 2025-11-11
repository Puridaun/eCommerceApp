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
  category: null;
  minPrice: null;
  maxPrice: null;
  searchQuery: "";
  sortBy: null;
};
