import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import useProducts from "../../hooks/useProducts";
import { AuthModal } from "../auth/AuthModal";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Link } from "react-router";

const Navbar: React.FC = () => {
  const { signOut, user } = useAuth();
  const {
    filters,
    setFilters,
    filteredProducts,
    setFilteredProducts,
    products,
  } = useProducts();
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
            <Link to="/cart">Cart</Link>
            <Link to="/favorite">Favorite</Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex justify-between items-center ">
        <div>I dont know</div>
        <div>
          <Button variant="ghost">Men</Button>
          <Button variant="ghost">Women</Button>
          <Button variant="ghost">Kids</Button>
          <Button variant="ghost">Electronics</Button>
          <Button variant="ghost">Jewelery</Button>
        </div>
        <div>
          <Button variant="ghost">Filters</Button>
          <Button variant="ghost">Sort by</Button>
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
