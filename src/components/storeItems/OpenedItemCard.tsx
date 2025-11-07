import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

export const OpenedItemCard: React.FC<{
  price: number;
  title: string;
  imgUrl: string;
}> = ({ price, title, imgUrl }) => {
  return (
    <Card className="relative max-w-[360px]  h-[540px] p-0 overflow-hidden">
      <CardHeader>
        <div className="flex justify-between w-full p-3">
          <Button>+</Button>
          <Button>+</Button>
        </div>
      </CardHeader>
      <CardContent
        className={`container p-0 w-full h-[75%] bg-[url('/itemsImages/${imgUrl}')] bg-cover bg-center`}
      ></CardContent>
      <CardFooter className="absolute bottom-0 w-full p-3">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{`$${price}`}</CardDescription>
        </div>
        <CardAction>
          <Button>+</Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
};
