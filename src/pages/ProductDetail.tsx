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
import { Button } from "../components/ui/button";
import type { ProductsType } from "../context/types";
import useProducts from "../hooks/useProducts";
import { useCart } from "../hooks/useCart";

const ProductDetail = () => {
  const params = useParams();
  const { favoriteProducts, setFavoriteProducts } = useProducts();
  const [product, setProduct] = useState<ProductsType | null>(null);
  const [counter, setCounter] = useState<number>(1);
  const [quantityErr, setQuantityErr] = useState<boolean>(false);
  const { addToCart } = useCart();
  const getProductById = async () => {
    const { data } = await apiClient.get(
      `https://fakestoreapi.com/products/${params.id}`
    );

    setProduct(data);
  };

  useEffect(() => {
    getProductById();
  }, []);

  const handleAddToFavorite = () => {
    if (!product) return;

    setFavoriteProducts((prev) => [...prev, product]);
  };

  return (
    <div>
      <div className="container flex w-full justify-center mx-auto gap-5">
        <img className="border rounded-xl p-8" src={product?.image} />
        <div className="flex flex-col gap-4 max-w-[560px]">
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
          <div>
            <p>Cantitate:</p>
            <div className="flex items-center border w-fit rounded-xl">
              <Button
                variant="ghost"
                onClick={() => {
                  if (counter > 1) {
                    setCounter(counter - 1);
                  } else {
                    setCounter(counter);
                  }
                }}
              >
                <IconMinus />
              </Button>
              <div className="px-2">{counter}</div>
              <Button
                variant="ghost"
                onClick={() => {
                  setCounter(counter + 1);
                }}
              >
                <IconPlus />
              </Button>
            </div>
            {quantityErr ? (
              <p className="text-red-500">Pick a quantity</p>
            ) : null}
          </div>
          <div className="flex items-center  gap-5">
            <Button
              className="w-75"
              onClick={() => addToCart(product!, counter)}
            >
              <IconShoppingCart />
              Adauga in cos
            </Button>
            <Button variant="outline" onClick={handleAddToFavorite}>
              {product && favoriteProducts.some((p) => p.id === product.id) ? (
                <IconHeartFilled />
              ) : (
                <IconHeart />
              )}
            </Button>
          </div>
        </div>
      </div>
      <div className="container w-full mx-auto py-[80px]">
        <p className="text-xl mb-5">Descriere</p>
        <p className="w-[586px]">{`${product?.description}. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum perferendis laboriosam doloremque esse ad assumenda consequatur, expedita fugiat provident nulla nostrum, nihil qui, beatae culpa! Maiores quidem natus excepturi explicabo.`}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
