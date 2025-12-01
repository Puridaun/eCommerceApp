import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Separator } from "../components/ui/separator";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { supabase } from "../lib/supabaseClient";
import {
  CheckoutValidation,
  type CheckoutValidationType,
} from "../lib/validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cartProducts, totalPrice, clearCart } = useCart();
  const { user, setShowAuthModal } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutValidationType>({
    resolver: zodResolver(CheckoutValidation),
  });

  const onSubmit = async (data: CheckoutValidationType) => {
    if (!user) {
      alert("Trebuie să fii logat");
      setShowAuthModal(true);
      return;
    }

    const orderData = {
      user_id: user.id,
      items: cartProducts,
      shipping: { method: "standard", cost: 4.99 },
      address: {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        street: data.street,
        city: data.city,
        zip: data.zip,
        country: data.country,
      },
      total: totalPrice + 4.99,
      currency: "RON",
      payment_status: "pending",
    };

    const { data: order, error } = await supabase
      .from("orders")
      .insert(orderData)
      .select()
      .single();

    if (error) {
      console.error(error);
      alert("Eroare la salvare comandă");
      return;
    }

    clearCart();
    navigate(`/order-success/${order.id}`);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input placeholder="First Name" {...register("firstName")} />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <Input placeholder="Last Name" {...register("lastName")} />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Input placeholder="Email" {...register("email")} />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div>
              <Input placeholder="Phone" {...register("phone")} />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <Input placeholder="Street Address" {...register("street")} />
              {errors.street && (
                <p className="text-red-500 text-sm">{errors.street.message}</p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Input placeholder="City" {...register("city")} />
                {errors.city && (
                  <p className="text-red-500 text-sm">{errors.city.message}</p>
                )}
              </div>
              <div>
                <Input placeholder="Zip Code" {...register("zip")} />
                {errors.zip && (
                  <p className="text-red-500 text-sm">{errors.zip.message}</p>
                )}
              </div>
              <div>
                <Input placeholder="Country" {...register("country")} />
                {errors.country && (
                  <p className="text-red-500 text-sm">
                    {errors.country.message}
                  </p>
                )}
              </div>
            </div>

            <Separator />

            <h2 className="text-xl font-semibold">Payment Details</h2>
            <div>
              <Input placeholder="Card Number" {...register("cardNumber")} />
              {errors.cardNumber && (
                <p className="text-red-500 text-sm">
                  {errors.cardNumber.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input placeholder="MM/YY" {...register("expiry")} />
                {errors.expiry && (
                  <p className="text-red-500 text-sm">
                    {errors.expiry.message}
                  </p>
                )}
              </div>
              <div>
                <Input placeholder="CVC" {...register("cvc")} />
                {errors.cvc && (
                  <p className="text-red-500 text-sm">{errors.cvc.message}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cartProducts.map((item) => (
                <div
                  key={item.cartProduct.id}
                  className="flex justify-between items-center"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {item.cartProduct.title}
                    </span>
                    <span className="text-sm text-neutral-500">
                      Qty: {item.quantity}
                    </span>
                  </div>
                  <span className="font-medium">
                    ${(item.cartProduct.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <Separator />

            <div className="flex justify-between">
              <span className="text-neutral-600">Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-neutral-600">Shipping</span>
              <span>$4.99</span>
            </div>

            <Separator />

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${(totalPrice + 4.99).toFixed(2)}</span>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4"
            >
              {isSubmitting ? "Submitting..." : "Place Order"}
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default Checkout;
