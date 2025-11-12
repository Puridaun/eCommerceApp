import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { AuthModal } from "../auth/AuthModal";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import useProducts from "../../hooks/useProducts";
import React from "react";

const Navbar: React.FC = () => {
  const { signOut, user } = useAuth();
  const { filters, setFilters } = useProducts();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");

  React.useEffect(() => {
    console.log(filters);
  }, [searchValue]);

  return (
    <div>
      <nav className="bg-white shadow p-4">
        <div className="container mx-auto  flex justify-between items-center">
          <h1 className="text-xl font-bold">E-Commerce Store</h1>
          <div className="flex gap-4  items-center justify-between">
            <Button>Home1</Button>
            <Button>Home2</Button>
            <Button>Home3</Button>
          </div>
          {user ? (
            <Button onClick={signOut}>Logout</Button>
          ) : (
            <Button onClick={() => setShowAuthModal(true)}>Login</Button>
          )}
        </div>
      </nav>
      <div className=" shadow p-4 ">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex gap-4 w-[560px]">
            <Input
              placeholder="Search an item"
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button
              onClick={() => {
                setFilters((prev: any) => ({
                  ...prev,
                  searchQuery: searchValue,
                }));
                setSearchValue("");
              }}
              type="button"
            >
              Search
            </Button>
          </div>
          <div className="flex gap-4">
            <Button type="button">Cart</Button>
            <Button type="button">Button2</Button>
            <Button type="button">Button3</Button>
          </div>
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
