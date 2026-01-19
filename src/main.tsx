import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { App } from "./App";
import { AuthProvider } from "./context/AuthContext";
import CartProductsProvider from "./context/CartProductsContext";
import FavoriteProductsProvider from "./context/FavoriteProductsContext";
import ProductsProvider from "./context/ProductsContext";
import "./index.css";
import ResponsiveProvider from "./context/ResponsiveContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ResponsiveProvider>
        <AuthProvider>
          <ProductsProvider>
            <CartProductsProvider>
              <FavoriteProductsProvider>
                <App />
              </FavoriteProductsProvider>
            </CartProductsProvider>
          </ProductsProvider>
        </AuthProvider>
      </ResponsiveProvider>
    </BrowserRouter>
  </StrictMode>
);
