import React, { useEffect, useState } from "react";
import useProducts from "../../hooks/useProducts";
import { DesktopProductCard } from "./DesktopProductCard";
import { MobileProductCard } from "./MobileProductCard";
import ItemsFilters from "./ProductsFilters";
import ItemsGrid from "./ProductsGrid";
import { useResponsive } from "../../hooks/useResponsive";

const ProductsDashboard: React.FC = () => {
  const { fetchProducts, loading, error, filteredProducts, categories } =
    useProducts();
  const { isMobile } = useResponsive();
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

  const ProductCard = isMobile ? MobileProductCard : DesktopProductCard;

  return (
    <div className="w-full flex gap-10">
      <ItemsFilters filterGroups={filterGroups} />
      <ItemsGrid>
        {filteredProducts.map((product) => (
          <ProductCard
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
