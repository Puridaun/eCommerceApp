import React from "react";
import ProductsDashboard from "../product/ProductsDashboard";

export const HomePage: React.FC = () => {
  return (
    <main className="p-4">
      <div className="container mx-auto">
        <ProductsDashboard />
      </div>
    </main>
  );
};
