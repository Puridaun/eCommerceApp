// components/cartProducts/CartSheet.tsx
import { Trash2 } from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CartSheet = ({ open, onOpenChange }: CartSheetProps) => {
  const { cartProducts, removeFromCart, clearCart } = useCart();

  const navigate = useNavigate();

  const handleCheckout = () => {
    onOpenChange(false);
    navigate("/checkout");
  };

  const totalPrice = useMemo(() => {
    return cartProducts.reduce((sum, item) => {
      return sum + item.cartProduct.price * item.quantity;
    }, 0);
  }, [cartProducts]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full max-w-md">
        <SheetHeader>
          <SheetTitle>Coșul tău ({cartProducts.length} produse)</SheetTitle>
        </SheetHeader>

        {cartProducts.length === 0 ? (
          <div className="flex items-center justify-center h-64 p-4">
            <p className="text-gray-500">Coșul este gol</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 my-6 max-h-[60vh] overflow-y-auto p-4">
              {cartProducts.map((item) => (
                <div
                  key={item.cartProduct.id}
                  className="flex gap-4 border-b pb-4"
                >
                  <img
                    src={item.cartProduct.image}
                    alt={item.cartProduct.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm line-clamp-2">
                      {item.cartProduct.title}
                    </h3>
                    <p className="text-blue-600 font-bold">
                      ${item.cartProduct.price}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Cantitate: {item.quantity}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.cartProduct)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <SheetFooter>
              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-blue-600">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                <Button
                  onClick={() => onOpenChange(false)}
                  variant="outline"
                  className="w-full"
                >
                  Continuă cumpărăturile
                </Button>

                <Button
                  onClick={handleCheckout}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Mergi la plată
                </Button>

                <Button
                  onClick={clearCart}
                  variant="destructive"
                  className="w-full"
                >
                  Șterge coșul
                </Button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
