import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Separator } from "../components/ui/separator";

type Order = {
  id: string;
  items: {
    cartProduct: {
      id: string;
      title: string;
      price: number;
    };
    quantity: number;
  }[];
  address: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    zip: string;
    country: string;
  };
  shipping: {
    method: string;
    cost: number;
  };
  total: number;
  currency: string;
  payment_status: string;
};

const OrderSuccess: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;

      const { data, error } = await supabase
        .from("orders")
        .select<string, Order>("*")
        .eq("id", orderId)
        .single();

      if (error) {
        console.error("Error fetching order:", error);
        setLoading(false);
        return;
      }

      setOrder(data);
      setLoading(false);
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <div className="container mx-auto py-10">Loading...</div>;
  if (!order)
    return (
      <div className="container mx-auto py-10">Comanda nu a fost găsită.</div>
    );

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Order Confirmation</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Shipping Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <p>
            {order.address.first_name} {order.address.last_name}
          </p>
          <p>{order.address.email}</p>
          <p>{order.address.phone}</p>
          <p>
            {order.address.street}, {order.address.city}, {order.address.zip},{" "}
            {order.address.country}
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 max-h-60 overflow-y-auto pr-1">
          {order.items.map((item) => (
            <div
              key={item.cartProduct.id}
              className="flex justify-between items-center"
            >
              <div className="flex flex-col">
                <span className="font-medium">{item.cartProduct.title}</span>
                <span className="text-sm text-neutral-500">
                  Qty: {item.quantity}
                </span>
              </div>
              <span className="font-medium">
                ${(item.cartProduct.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span className="text-neutral-600">
              Shipping ({order.shipping.method})
            </span>
            <span>${order.shipping.cost.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
          <div className="mt-2">
            <span className="text-sm text-green-600">
              Payment Status: {order.payment_status}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSuccess;
