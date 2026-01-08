import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../lib/supabaseClient";

type OrderSummary = {
  id: string;
  total: number;
  shipping: {
    method: string;
    cost: number;
  };
  payment_status: string;
  created_at: string;
};

const Orders: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("orders")
        .select<string, OrderSummary>("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
        return;
      }

      setOrders(data || []);
      setLoading(false);
    };

    fetchOrders();
  }, [user]);

  if (loading) return <div className="container mx-auto py-10">Loading...</div>;
  if (!orders.length)
    return (
      <div className="container mx-auto py-10">Nu ai nicio comandă încă.</div>
    );

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {orders.map((order) => (
          <Card
            key={order.id}
            className="cursor-pointer hover:shadow-lg transition"
            onClick={() => navigate(`/order-success/${order.id}`)}
          >
            <CardHeader>
              <CardTitle>Order #{order.id}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="flex justify-between">
                <span>Total:</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>{order.shipping.method}</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span
                  className={`${
                    order.payment_status === "paid"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {order.payment_status}
                </span>
              </div>
              <div>
                <span className="text-sm text-neutral-500">
                  Plasată: {new Date(order.created_at).toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Orders;
