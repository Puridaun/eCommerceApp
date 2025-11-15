import React from "react";
import { useAuth } from "../../hooks/useAuth";
import ProductsDashboard from "../product/ProductsDashboard";

export const HomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <main className="p-4">
      <div className="container mx-auto">
        {user ? <ProductsDashboard /> : "Conecteaza-te pentru a continua"}
      </div>
    </main>
  );
};
