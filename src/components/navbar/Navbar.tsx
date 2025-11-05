import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { AuthModal } from "../auth/AuthModal";
import { Button } from "../ui/button";

const Navbar: React.FC = () => {
  const { signOut, user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  return (
    <div>
      <nav className="bg-white shadow p-4">
        <div className="container mx-auto flex justify-between">
          <h1 className="text-xl font-bold">E-Commerce Store</h1>
          {user ? (
            <Button onClick={signOut}>Logout</Button>
          ) : (
            <Button onClick={() => setShowAuthModal(true)}>Login</Button>
          )}
        </div>
      </nav>
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
};

export default Navbar;
