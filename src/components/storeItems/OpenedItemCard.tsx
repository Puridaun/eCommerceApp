import { IconArrowLeft, IconHeart } from "@tabler/icons-react";
import React from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export const OpenedItemCard: React.FC<{
  price: number;
  title: string;
  imgUrl: string;
}> = ({ price, title, imgUrl }) => {
  return (
    <Card className="relative max-w-[360px]  h-[540px] p-4 overflow-hidden">
      <CardHeader
        className={`container p-0 w-full h-[75%] bg-cover bg-center`}
        style={{ backgroundImage: `url(/itemsImages/${imgUrl})` }}
      >
        <div className="flex justify-between w-full">
          <Button variant="outline" className="rounded-full bg-neutral-300 p-5">
            <IconArrowLeft stroke={2} />
          </Button>
          <Button
            variant="outline"
            className="relative rounded-full bg-neutral-300 p-5 "
          >
            <IconHeart stroke={2} />
            <div className="rounded-full bg-red-500 py-0.5 px-1.5  text-[8px] absolute right-[-4px] top-[-4px] text-neutral-100">
              1
            </div>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <p>{`$${price}`}</p>
        </div>
        <div className="flex items-center justify-between">
          <p>Categroy</p>
          <div>Reviews</div>
        </div>
        <CardDescription>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum eius
          architecto aliquam doloribus, nam tempora.
        </CardDescription>
        <div>
          <p>Sizes and colours</p>
        </div>
        <CardAction className="w-full">
          <Button
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
