import React, { useEffect } from "react";
import useProducts from "../../hooks/useProducts";
import { DesktopProductCard } from "./DesktopProductCard";
import ItemsFilters from "./ProductsFilters";
import ItemsGrid from "./ProductsGrid";

const ProductsDashboard: React.FC = () => {
  const { fetchProducts, loading, error, filteredProducts, categories } =
    useProducts();
  useEffect(() => {
    fetchProducts();
  }, []);

  const filterGroups = [
    {
      groupName: "Category",
      groupOptions: categories,
    },
    {
      groupName: "Price",
      groupOptions: ["0-50", "50-100", "100-200", "200+"],
    },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  return (
    <div className="w-full flex gap-10">
      <ItemsFilters filterGroups={filterGroups} />
      <ItemsGrid>
        {filteredProducts.map((product) => (
          <DesktopProductCard
            key={product.id}
            product={product}
            price={product.price}
            title={product.title}
            imgUrl={product.image}
            category={product.category}
          />
        ))}
      </ItemsGrid>
    </div>
  );
};

export default ProductsDashboard;
