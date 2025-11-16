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

const Navbar: React.FC = () => {
  const { signOut, user } = useAuth();
  const { filters, setFilters, cart, setFilteredProducts, products } =
    useProducts();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");

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

  return (
    <div>
      <nav className="bg-white shadow p-2">
        <div className="container mx-auto  flex justify-between items-center">
          <h1 className="text-xl font-bold">E-Commerce Store</h1>
          <div className="flex gap-4  items-center justify-between">
            <Button variant="ghost">Home1</Button>
            <Button variant="ghost">Home2</Button>
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
            <Button className="relative" variant="ghost">
              Cart
              <IconShoppingCart />
              {cart.length ? (
                <div className="absolute border rounded-full bg-neutral-700 text-neutral-100 px-1.5 py-0.5 text-[8px] top-1 right-0">
                  {cart.length}
                </div>
              ) : null}
            </Button>
            <Button variant="ghost">
              Favorite <IconHeart />
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
    </div>
  );
};

export default Navbar;
