import {
  IconArrowsSort,
  IconFilter2,
  IconHeart,
  IconMenu2,
  IconSearch,
  IconShoppingCart,
} from "@tabler/icons-react";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { useFavorite } from "../../hooks/useFavorite";
import useProducts from "../../hooks/useProducts";
import { useResponsive } from "../../hooks/useResponsive";
import { AuthModal } from "../auth/AuthModal";
import { CartSheet } from "../cartProducts/CartSheet";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { signOut, user, showAuthModal, setShowAuthModal } = useAuth();
  const { filters, setFilters, setFilteredProducts, products } = useProducts();
  const [openCart, setOpenCart] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const { cartTotal } = useCart();
  const { favoriteTotal } = useFavorite();
  const { isMobile } = useResponsive();

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
    setOpenMobileMenu(false);
  };

  return (
    <div className="sticky top-0 z-20 bg-white">
      <nav className="shadow p-2">
        <div className="container mx-auto flex justify-between items-center">
          {isMobile ? (
            <Sheet open={openMobileMenu} onOpenChange={setOpenMobileMenu}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <IconMenu2 />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-2 mt-6">
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => {
                      navigate("/");
                      setOpenMobileMenu(false);
                    }}
                  >
                    Home
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={handleToOrders}
                  >
                    Orders
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => setOpenMobileMenu(false)}
                  >
                    About
                  </Button>
                  <div className="border-t my-2" />
                  {user ? (
                    <Button
                      variant="ghost"
                      className="justify-start"
                      onClick={() => {
                        signOut();
                        setOpenMobileMenu(false);
                      }}
                    >
                      Logout
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      className="justify-start"
                      onClick={() => {
                        setShowAuthModal(true);
                        setOpenMobileMenu(false);
                      }}
                    >
                      Login
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <h1 className="text-xl font-bold">E-Commerce Store</h1>
          )}

          {!isMobile && (
            <div className="flex gap-1 items-center justify-between">
              <Button variant="ghost">Home</Button>
              <Button onClick={handleToOrders} variant="ghost">
                Orders
              </Button>
              <Button variant="ghost">About</Button>
            </div>
          )}

          {isMobile ? (
            <h1 className="text-lg font-bold">Store</h1>
          ) : user ? (
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

      <div className="shadow p-2">
        <div className="container mx-auto flex justify-between items-center gap-2">
          <div className={`flex gap-2 ${isMobile ? "flex-1" : "w-[560px]"}`}>
            <Input
              placeholder="Search an item"
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearchItems()}
            />
            <Button
              onClick={() => handleSearchItems()}
              type="button"
              size={isMobile ? "icon" : "default"}
            >
              {isMobile ? <IconSearch size={18} /> : "Search"}
            </Button>
          </div>

          <div className="flex gap-2 items-center">
            <Button
              onClick={() => setOpenCart(true)}
              className="relative"
              variant="ghost"
              size={isMobile ? "icon" : "default"}
            >
              {!isMobile && "Cart"}
              <IconShoppingCart size={isMobile ? 20 : 24} />
              {cartTotal ? (
                <div className="absolute border rounded-full bg-neutral-700 text-neutral-100 px-1.5 py-0.5 text-[8px] top-1 right-0">
                  {cartTotal}
                </div>
              ) : null}
            </Button>

            {!isMobile && (
              <Button className="relative" variant="ghost">
                Favorite <IconHeart />
                {favoriteTotal ? (
                  <div className="absolute border rounded-full bg-neutral-700 text-neutral-100 px-1.5 py-0.5 text-[8px] top-1 right-0">
                    {favoriteTotal}
                  </div>
                ) : null}
              </Button>
            )}
          </div>
        </div>
      </div>

      {!isMobile && (
        <div className="py-2 shadow">
          <div className="container mx-auto flex justify-between items-center">
            <div>
              <Button variant="ghost">Men</Button>
              <Button variant="ghost">Women</Button>
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
        </div>
      )}

      {isMobile && (
        <div className="py-2 shadow">
          <div className="container mx-auto flex justify-center gap-2">
            <Button variant="ghost" size="sm">
              <IconFilter2 size={16} />
              Filters
            </Button>
            <Button variant="ghost" size="sm">
              <IconArrowsSort size={16} />
              Sort
            </Button>
          </div>
        </div>
      )}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
      <CartSheet open={openCart} onOpenChange={setOpenCart} />
    </div>
  );
};

export default Navbar;
