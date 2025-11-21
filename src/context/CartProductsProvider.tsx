import React, {
  createContext,
  useEffect,
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
  }, []);

  useEffect(() => {
    localStorage.setItem("ecommerce_cart", JSON.stringify(cartProducts));
    console.log("Cart saved to localStorage");
  }, [cartProducts]);

  const addToCart = (product: ProductsType, quantity: number) => {
    quantity > 0
      ? setCartProducts((prev) => [
          ...prev,
          {
            cartProduct: product,
            quantity: quantity,
          },
        ])
      : null;
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

  const value = {
    cartProducts,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    setCartProducts,
  };
  return (
    <CartProductsContext.Provider value={value}>
      {children}
    </CartProductsContext.Provider>
  );
};

export default CartProductsProvider;
