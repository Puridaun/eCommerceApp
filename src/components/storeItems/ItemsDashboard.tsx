import React, { useEffect } from "react";
import ItemsGrid from "./ItemsGrid";
import { OpenedItemCard } from "./OpenedItemCard";
import ItemsFilters from "./ItemsFilters";
import useProducts from "../../hooks/useProducts";

const filters = [
  { name: "Category", options: ["Men", "Women", "Electronics", "Jewelery"] },
  { name: "Price", options: ["0-50", "50-100", "100-200", "200+"] },
];

const ItemsDashboard: React.FC = () => {
  const { fetchProducts, products, loading, error } = useProducts();
  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  return (
    <div className="w-full flex gap-10">
      <ItemsFilters filters={filters} />
      <ItemsGrid>
        {products.map((product) => (
          <OpenedItemCard
            key={product.id}
            price={product.price}
            title={product.title}
            imgUrl={product.image}
            description={product.description}
            category={product.category}
          />
        ))}
      </ItemsGrid>
    </div>
  );
};

export default ItemsDashboard;
