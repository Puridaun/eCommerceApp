import React from "react";
import { useAuth } from "../../hooks/useAuth";
import ItemsDashboard from "../storeItems/ItemsDashboard";

export const HomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <main className="p-4">
      <div className="container mx-auto ">
        {user ? (
          <>
            <ItemsDashboard />
          </>
        ) : (
          "Conecteaza-te pentru a continua"
        )}
      </div>
    </main>
  );
};
