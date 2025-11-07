import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { ItemCard } from "../storeItems/ItemCard";
import { OpenedItemCard } from "../storeItems/OpenedItemCard";

export const HomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <main className=" p-4">
      <div className="container mx-auto ">
        <h2>
          {user ? (
            <>
              <p>{`Bine ai venit ${user.user_metadata.full_name}`}</p>
              <OpenedItemCard
                price={64}
                imgUrl="Athletic_Running_Shoes.jpg"
                title="Running Shoes"
              />
            </>
          ) : (
            "Conecteaza-te pentru a continua"
          )}
        </h2>
      </div>
    </main>
  );
};
