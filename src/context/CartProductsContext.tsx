import React, {
  createContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  CartProductsInterface,
  CartProductType,
  ProductsType,
} from "./types";

export const CartProductsContext = createContext<CartProductsInterface | null>(
  null
);

const CartProductsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartProducts, setCartProducts] = useState<CartProductType[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    const savedCart = localStorage.getItem("ecommerce_cart");
    if (savedCart) {
      try {
        setCartProducts(JSON.parse(savedCart));
        console.log("Cart loaded from localStorage");
      } catch (err) {
        console.error("Failed to parse cart:", err);
      }
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("ecommerce_cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts, isHydrated]);

  const addToCart = (product: ProductsType, quantity: number) => {
    if (quantity <= 0) return;

    setCartProducts((prev) => {
      const existing = prev.find((item) => item.cartProduct.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.cartProduct.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...prev,
        {
          cartProduct: product,
          quantity,
        },
      ];
    });
  };

  const removeFromCart = (product: ProductsType) => {
    cartProducts
      ? setCartProducts((prev) =>
          prev.filter((item) => item.cartProduct.id !== product.id)
        )
      : [];
  };

  const updateQuantity = (product: ProductsType, quantity: number) => {
    setCartProducts((prev) =>
      prev.filter((item) => {
        if (item.cartProduct.id === product.id)
          return { ...item, quantity: quantity };
      })
    );
  };

  const clearCart = () => {
    setCartProducts([]);
  };

  const cartTotal = cartProducts.length;

  const totalPrice = useMemo(() => {
    return cartProducts.reduce((sum, item) => {
      return sum + item.cartProduct.price * item.quantity;
    }, 0);
  }, [cartProducts]);

  const value = {
    cartProducts,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    setCartProducts,
    totalPrice,
  };
  return (
    <CartProductsContext.Provider value={value}>
      {children}
    </CartProductsContext.Provider>
  );
};

export default CartProductsProvider;
