import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  IconHeart,
  IconHeartFilled,
  IconShoppingCart,
  IconStar,
} from "@tabler/icons-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import type { ProductsType } from "../../context/types";
import { useCart } from "../../hooks/useCart";
import { useFavorite } from "../../hooks/useFavorite";
import { toast } from "sonner";

export const MobileProductCard: React.FC<{
  price: number;
  title: string;
  imgUrl: string;
  description?: string;
  category: string;
  product: ProductsType;
}> = ({ price, title, imgUrl, category, product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToFavorite, isFavorite } = useFavorite();
  const [isHovered, setIsHovered] = useState(false);
  const favorite = isFavorite(product);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    toast.success("Adăugat în coș!");
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToFavorite(product);
  };

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  const rating = product.rating?.rate || 4.5;
  const reviewCount = product.rating?.count || 0;

  return (
    <Card
      className="group relative w-full h-full overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className="relative w-full h-[240px] overflow-hidden bg-gray-50">
        <img
          src={imgUrl}
          alt={title}
          className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
        />

        <div
          className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-2 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <Button
            onClick={handleAddToCart}
            className="bg-white text-black hover:bg-gray-100"
            size="sm"
          >
            <IconShoppingCart className="w-4 h-4 mr-1" />
            Adaugă
          </Button>
        </div>

        <button
          onClick={handleToggleFavorite}
          className="absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-white rounded-full shadow-md transition-all z-10"
        >
          {favorite ? (
            <IconHeartFilled className="w-4 h-4 text-red-500" />
          ) : (
            <IconHeart className="w-4 h-4 text-gray-700" />
          )}
        </button>

        <div className="absolute top-2 left-2 px-2 py-0.5 bg-black text-white text-xs font-medium rounded">
          {category}
        </div>
      </div>

      <CardContent className="p-3 space-y-1.5">
        <h3 className="font-semibold text-sm line-clamp-2 min-h-[36px] text-gray-900 group-hover:text-black transition-colors">
          {title}
        </h3>

        <div className="flex items-center gap-1">
          <IconStar className="w-3.5 h-3.5 fill-black text-black" />
          <span className="text-xs font-medium text-gray-900">
            {rating.toFixed(1)}
          </span>
          <span className="text-xs text-gray-500">({reviewCount})</span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-lg font-bold text-gray-900">
            ${price.toFixed(2)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
