import React, { useEffect, useState } from "react";
import { apiClient } from "../apiClient";
import type { Products } from "../context/types";
import { useParams } from "react-router";
import { IconStar, IconStarFilled, IconStars } from "@tabler/icons-react";
import { Button } from "../components/ui/button";

const ProductDetail = () => {
  const params = useParams();
  const [product, setProduct] = useState<Products | null>(null);
  const getProductById = async () => {
    const { data } = await apiClient.get(
      `https://fakestoreapi.com/products/${params.id}`
    );

    setProduct(data);
  };

  useEffect(() => {
    getProductById();
  }, []);
  return (
    <div className="container flex w-full mx-auto ">
      <img className="p-10" src={product?.image} />
      <div className="flex flex-col gap-2 max-w-[725px]">
        <div className="flex gap-1">
          <div className="flex gap-1">
            <IconStarFilled className="w-4" />
            <IconStarFilled className="w-4" />
            <IconStarFilled className="w-4" />
            <IconStarFilled className="w-4" />
            <IconStarFilled className="w-4" />
          </div>
          <p>{`${product?.rating.count} Reviews`}</p>
        </div>
        <h1 className="text-[32px]">{product?.title}</h1>
        <h1 className="text-[32px]">{`${product?.price} $`}</h1>
        <div>
          <p>Marime:</p>
          <div className="flex gap-1">
            <Button variant="secondary">XXS</Button>
            <Button variant="secondary">XS</Button>
            <Button variant="secondary">S</Button>
            <Button variant="secondary">M</Button>
            <Button variant="secondary">L</Button>
            <Button variant="secondary">XL</Button>
            <Button variant="secondary">XXL</Button>
            <Button variant="secondary">XXXL</Button>
          </div>
        </div>
        <div>
          <p>Culoare:</p>
          <div className="flex gap-1">
            <Button
              className="rounded-full w-9 bg-red-500"
              variant="outline"
            ></Button>
            <Button
              className="rounded-full w-9 bg-green-300"
              variant="outline"
            ></Button>
            <Button
              className="rounded-full w-9 bg-blue-500"
              variant="outline"
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
