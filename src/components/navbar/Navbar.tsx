import {
  IconArrowsSort,
  IconFilter2,
  IconHeart,
  IconShoppingCart,
} from "@tabler/icons-react";
import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import useProducts from "../../hooks/useProducts";
import { AuthModal } from "../auth/AuthModal";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useCart } from "../../hooks/useCart";
import { useFavorite } from "../../hooks/useFavorite";
import { CartSheet } from "../cartProducts/CartSheet";
import { useNavigate } from "react-router";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { signOut, user, showAuthModal, setShowAuthModal } = useAuth();
  const { filters, setFilters, setFilteredProducts, products } = useProducts();
  const [openCart, setOpenCart] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const { cartTotal } = useCart();
  const { favoriteTotal } = useFavorite();
  const handleSearchItems = () => {
    const query = searchValue.trim().toLowerCase();

    setFilters((prev: any) => ({
      ...prev,
      searchQuery: query,
    }));

    if (query === "") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((item) => item.title.toLowerCase().includes(query))
      );
      console.log(filters);
    }

    setSearchValue("");
  };

  const handleToOrders = () => {
    user ? navigate("/orders") : setShowAuthModal(true);
  };

  return (
    <div>
      <nav className="bg-white shadow p-2">
        <div className="container mx-auto  flex justify-between items-center">
          <h1 className="text-xl font-bold">E-Commerce Store</h1>
          <div className="flex gap-4  items-center justify-between">
            <Button variant="ghost">Home1</Button>
            <Button onClick={handleToOrders} variant="ghost">
              Orders
            </Button>
            <Button variant="ghost">Home3</Button>
          </div>
          {user ? (
            <Button variant="ghost" onClick={signOut}>
              Logout
            </Button>
          ) : (
            <Button variant="ghost" onClick={() => setShowAuthModal(true)}>
              Login
            </Button>
          )}
        </div>
      </nav>
      <div className=" shadow p-2 ">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex gap-4 w-[560px]">
            <Input
              placeholder="Search an item"
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button onClick={() => handleSearchItems()} type="button">
              Search
            </Button>
          </div>
          <div className="flex gap-4 items-center">
            <Button
              onClick={() => {
                setOpenCart(true);
              }}
              className="relative"
              variant="ghost"
            >
              Cart
              <IconShoppingCart />
              {cartTotal ? (
                <div className="absolute border rounded-full bg-neutral-700 text-neutral-100 px-1.5 py-0.5 text-[8px] top-1 right-0">
                  {cartTotal}
                </div>
              ) : null}
            </Button>
            <Button className="relative" variant="ghost">
              Favorite <IconHeart />
              {favoriteTotal ? (
                <div className="absolute border rounded-full bg-neutral-700 text-neutral-100 px-1.5 py-0.5 text-[8px] top-1 right-0">
                  {favoriteTotal}
                </div>
              ) : null}
            </Button>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex justify-between items-center py-2 ">
        <div>I dont know</div>
        <div>
          <Button variant="ghost">Men</Button>
          <Button variant="ghost">Women</Button>
          <Button variant="ghost">Kids</Button>
          <Button variant="ghost">Electronics</Button>
          <Button variant="ghost">Jewelery</Button>
        </div>
        <div>
          <Button variant="ghost">
            Filters
            <IconFilter2 />
          </Button>
          <Button variant="ghost">
            Sort by
            <IconArrowsSort />
          </Button>
        </div>
      </div>
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
      <CartSheet open={openCart} onOpenChange={setOpenCart} />
    </div>
  );
};

export default Navbar;
