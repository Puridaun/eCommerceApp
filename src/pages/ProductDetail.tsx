import {
  IconHeart,
  IconHeartFilled,
  IconMinus,
  IconPlus,
  IconShoppingCart,
  IconStarFilled,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { apiClient } from "../apiClient";
import { CartSheet } from "../components/cartProducts/CartSheet";
import { Button } from "../components/ui/button";
import type { ProductsType } from "../context/types";
import { useCart } from "../hooks/useCart";
import { useFavorite } from "../hooks/useFavorite";

const ProductDetail = () => {
  const params = useParams();
  const { addToCart } = useCart();
  const { addToFavorite, favoriteProducts } = useFavorite();
  const [product, setProduct] = useState<ProductsType | null>(null);
  const [counter, setCounter] = useState<number>(1);
  const [openCart, setOpenCart] = useState(false);
  const getProductById = async () => {
    const { data } = await apiClient.get(
      `https://fakestoreapi.com/products/${params.id}`
    );

    setProduct(data);
  };

  useEffect(() => {
    getProductById();
  }, []);

  const isInFavorite = favoriteProducts.some((item) => item.id === product?.id);
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex justify-center lg:w-1/2">
          <img
            className="border rounded-xl p-8 max-w-[420px] w-full object-contain"
            src={product?.image}
            alt={product?.title}
          />
        </div>

        <div className="flex flex-col gap-4 lg:w-1/2">
          <div className="flex items-center gap-2">
            <div className="flex gap-1 text-yellow-500">
              <IconStarFilled className="w-4" />
              <IconStarFilled className="w-4" />
              <IconStarFilled className="w-4" />
              <IconStarFilled className="w-4" />
              <IconStarFilled className="w-4" />
            </div>
            <p className="text-gray-600">{product?.rating.count} Reviews</p>
          </div>

          <h1 className="text-3xl font-semibold leading-tight">
            {product?.title}
          </h1>
          <p className="text-3xl font-bold">{product?.price} $</p>

          <div className="space-y-1">
            <p className="font-medium">Marime:</p>
            <div className="flex flex-wrap gap-2">
              {["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"].map((size) => (
                <Button key={size} variant="secondary">
                  {size}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <p className="font-medium">Culoare:</p>
            <div className="flex gap-2">
              <Button
                className="rounded-full w-8 h-8 bg-red-500"
                variant="outline"
              ></Button>
              <Button
                className="rounded-full w-8 h-8 bg-green-300"
                variant="outline"
              ></Button>
              <Button
                className="rounded-full w-8 h-8 bg-blue-500"
                variant="outline"
              ></Button>
            </div>
          </div>

          <div className="space-y-1">
            <p className="font-medium">Cantitate:</p>
            <div className="flex items-center border rounded-xl w-fit px-1">
              <Button
                variant="ghost"
                onClick={() => setCounter(Math.max(1, counter - 1))}
              >
                <IconMinus />
              </Button>
              <span className="px-4">{counter}</span>
              <Button variant="ghost" onClick={() => setCounter(counter + 1)}>
                <IconPlus />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <Button
              className="flex items-center gap-2 w-[200px]"
              onClick={() => {
                addToCart(product!, counter);
                setOpenCart(true);
              }}
            >
              <IconShoppingCart />
              Adauga in cos
            </Button>

            <Button variant="outline" onClick={() => addToFavorite(product!)}>
              {isInFavorite ? (
                <IconHeartFilled className="text-red-500" />
              ) : (
                <IconHeart />
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-14 max-w-3xl">
        <h2 className="text-xl font-semibold mb-3">Descriere</h2>
        <p className="text-gray-700 leading-relaxed">
          {product?.description}. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Rerum perferendis laboriosam doloremque esse ad
          assumenda consequatur, expedita fugiat provident nulla nostrum, nihil
          qui, beatae culpa!
        </p>
      </div>

      <CartSheet open={openCart} onOpenChange={setOpenCart} />
    </div>
  );
};

export default ProductDetail;
