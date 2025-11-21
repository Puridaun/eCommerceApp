import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { AuthProvider } from "./context/AuthContext";
import ProductsProvider from "./context/ProductsProvider";
import { BrowserRouter } from "react-router";
import CartProductsProvider from "./context/CartProductsProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProductsProvider>
          <CartProductsProvider>
            <App />
          </CartProductsProvider>
        </ProductsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
