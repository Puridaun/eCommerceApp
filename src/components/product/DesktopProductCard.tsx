import React from "react";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import type { Products } from "../../context/types";

export const DesktopProductCard: React.FC<{
  price: number;
  title: string;
  imgUrl: string;
  description?: string;
  category: string;
  product: Products;
}> = ({ price, title, imgUrl, category, product }) => {
  const navigate = useNavigate();
  return (
    <Card className="relative w-[320px]  h-[540px] p-4 overflow-hidden">
      <CardHeader
        onClick={() => {
          navigate(`/products/${product.id}`);
        }}
        className={`container p-0 w-full h-full bg-cover bg-center bg-contain bg-no-repeat`}
        style={{ backgroundImage: `url(${imgUrl})` }}
      ></CardHeader>
      <CardContent className="p-0">
        <div className="flex items-center justify-between">
          <CardTitle
            onClick={() => {
              navigate(`/products/${product.id}`);
            }}
            className="truncate w-64 cursor-pointer"
          >
            {title}
          </CardTitle>
          <p>{`$${price}`}</p>
        </div>
        <div className="flex items-center justify-between">
          <p>{category}</p>
          <div>Reviews</div>
        </div>
        <div>
          <p>Sizes and colours</p>
        </div>
        <CardAction className="w-full">
          <Button
            onClick={() => {
              navigate(`/products/${product.id}`);
            }}
            variant="outline"
            className="rounded-full w-full bg-neutral-300 p-5 "
          >
            Add to cart
          </Button>
        </CardAction>
      </CardContent>
    </Card>
  );
};
