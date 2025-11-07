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

export const ItemCard: React.FC<{
  price: number;
  title: string;
  imgUrl: string;
}> = ({ price, title, imgUrl }) => {
  return (
    <Card className="relative max-w-[288px]  h-[380px] p-0 overflow-hidden">
      <CardHeader
        className={`container p-0 w-full h-[75%] bg-[url('/itemsImages/${imgUrl}')] bg-cover bg-center`}
      ></CardHeader>
      <CardContent className="absolute bottom-0 w-full p-3">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{`$${price}`}</CardDescription>
        </div>
        <CardAction>
          <Button>+</Button>
        </CardAction>
      </CardContent>
    </Card>
  );
};
